const { createSign, createVerify } = require('crypto');
const { stringify } = require('querystring')
const { request } = require('http')
const { parse } = require('url')

const { GatewayException, InvalidSignException } = require('../error')

module.exports = class Util {
  static getGateway(isDev = false) {
    return `https://openapi.alipay${isDev ? 'dev' : ''}.com/gateway.do`
  }
  static getDateTime(timestamp) {
    timestamp = timestamp || Date.now()
    const _ = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']  // 补零
    const timer = new Date(timestamp)
    const y = timer.getFullYear()
    const mon = timer.getMonth() + 1
    const d = timer.getDate()
    const h = timer.getHours()
    const m = timer.getMinutes()
    const s = timer.getSeconds()
    return `${y}-${_[mon] || mon}-${_[d] || d} ${_[h] || h}:${_[m] || m}:${_[s] || s}`
  }
  static insertStr(str, insert_str, sn) {
    let newstr = ''
    for (let i = 0; i < str.length; i += sn) {
      let tmp = str.substring(i, i + sn)
      newstr += tmp + insert_str
    }
    return newstr
  }
  static httpPost(url, data) {
    return new Promise((resolve, reject) => {
      data = stringify(data)
      const { hostname, path } = parse(url)
      const options = {
        hostname,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }
      const req = request(options, res => {
        res.setEncoding('utf8')
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (error) {
            error.message = 'Cannot resolve the interface returned data'
            reject(error)            
          }
        })
      })
      req.on('error', error => {
        reject(error)
      })
      req.write(data)
      req.end()
    })
  }
  static request(url, payload, public_key) {
    return new Promise((resolve, reject) => {
      Util.httpPost(url, payload)
        .then(data => {
          const sign = data.sign
          data = data[payload.method.replace(/\./g, '_') + '_response']
          // 开始验签
          if (!Util.verifySign(data, public_key, sign, true)) {
            return reject(new InvalidSignException('验签失败', sign))
          }
          if (data.code && data.code === '10000') {
            return resolve(data)
          }
          return reject(new GatewayException(data.sub_msg || data.msg, data))
        })
        .catch(error => {
          reject(new GatewayException(error.message, null))
        })
    })
  }
  static stringify(...args) {
    return stringify(...args)
  }
  static generateSign(payload, private_key) {
    const dispose = Util.getSignContent(payload)
    // 使用商户私钥进行RSA2签名
    const sign = createSign('RSA-SHA256')
    sign.write(dispose)
    sign.end()
    private_key = Util.getPemString(private_key, false)
    return sign.sign(private_key, 'base64')
  }
  static verifySign(payload, public_key, sign = null, isSync = false) {
    sign = sign || payload.sign
    if (payload.sign) {
      delete payload.sign
    }
    if (payload.sign_type) {
      delete payload.sign_type
    }
    const dispose = isSync ? JSON.stringify(payload).replace(/\//g, '\\\/')
      : Util.getSignContent(payload)
    // 使用支付宝公钥进行RSA2验签
    const verify = createVerify('RSA-SHA256')
    verify.update(dispose)
    public_key = Util.getPemString(public_key)
    // 返回验签结果
    return verify.verify(public_key, sign, 'base64')
  }
  static getSignContent(payload) {
    let dispose = {}
    Object.keys(payload).sort().forEach(key => dispose[key] = payload[key])
    return decodeURIComponent(stringify(dispose, '&', '='))
  }
  static getPemString(key, isPublic = true) {
    if (key.startsWith('-----BEGIN')) {
      return key
    }
    const type = isPublic ? 'PUBLIC' : 'PRIVATE'
    return `-----BEGIN ${type} KEY-----\n${Util.insertStr(key, '\n', 64)}-----END ${type} KEY-----`
  }
  static buildFormHTML(endpoint, payload) {
    let html = `<form id="alipaysubmit" name="alipaysubmit" action="${endpoint}" method="POST" accept-charset="${payload.charset}" onsubmit="document.charset='${payload.charset}'">`
    Object.keys(payload).forEach(key => {
      const val = payload[key]
        .replace(/'/g, '&apos;')
      html += `<input type="hidden" name="${key}" value='${val}' />`
    })
    html += '<input type="submit" value="ok" style="display: none;"></form>'
    html += '<script>document.forms["alipaysubmit"].submit();</script>'
    return html
  }

}