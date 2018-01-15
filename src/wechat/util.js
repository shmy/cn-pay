const { createHash } = require('crypto')
const { parseString, Builder } = require('xml2js')
const { parse } = require('url')
const { stringify } = require('querystring')
const { request } = require('https')

const { GatewayException, InvalidSignException } = require('../error')

class Util {
  static createNonceStr(length = 15) {
    return Math.random().toString(36).substr(2, length)
  }
  static request(url, data) {
    url = 'https://apihk.mch.weixin.qq.com' + url
    data = Util.buildObject(data)
    return new Promise((resolve, reject) => {
      const { hostname, path } = parse(url)
      const options = {
        hostname,
        path,
        protocol: 'https:',
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml; charset=utf-8'
        }
      }
      const req = request(options, res => {
        res.setEncoding('utf8')
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          Util.parseXML(data)
            .then(data => {
              if (data.return_code !== 'SUCCESS') {
                return reject(new GatewayException(data.return_msg || 'response error', data))
              }
              return resolve(data)
            })
            .catch(error => {
              reject(error)
            })
        })
      })
      req.on('error', error => {
        reject(error)
      })
      req.write(data)
      req.end()
    })
  }
  // 把js对象转换成xml字符串
  static buildObject(obj) {
    return new Builder({
      rootName: 'xml',
      cdata: true,
      headless: true
    }).buildObject(obj)
  }

  // 把xml字符串转换成js对象
  static parseXML(xmlString) {
    return new Promise((resolve, reject) => {
      parseString(xmlString, { trim: true }, (error, result) => {
        if (error) return reject(error)
        result = result.xml
        // 内容会被解析一个数组，应该取下标0
        Object.keys(result).forEach(key => result[key] = result[key][0])
        resolve(result)
      })
    })
  }

  // 转换成md5
  static createMD5(source) {
    return createHash('md5').update(source).digest('hex')
  }
  // 签名
  static generateSign(payload, key) {
    const dispose = {}
    // 第一步： 按 key 值进行自然排序
    Object.keys(payload).sort().forEach(key => dispose[key] = payload[key])
    // 第二步： 把对象转换为类似HTTP Query 参数 并去除URL转义符号
    let str = decodeURIComponent(stringify(dispose, '&', '='))
    // 第三步： 加入私钥字段进行MD5转码并大写
    str += '&key=' + key
    return Util.createMD5(str).toUpperCase()
  }

  // static getSignkey(payload) {
  //   return Util.httpPost('/pay/getsignkey', payload, true)
  // }
}

module.exports = Util