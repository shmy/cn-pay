const { GatewayException } = require('../error')

const util = require('./util')
const Gateways = {}
const methods = [
  'app',
  'mp',
  'wap',
  'pos',
  'scan',
  'miniapp',
  'transfer'
]
methods.forEach(name => Gateways[`${name}Gateway`] = require(`./gateways/${name}.gateway`))

class Wechat {

  /**
   * 
   * @param {Object} config 构造参数
   * @param {String} config.app_id 公众号的appid
   * @param {String} config.appid App 的appid
   * @param {String} config.miniapp_id 小程序的appid
   * @param {String} config.mch_id 商户id
   * @param {String} config.key 密钥
   * @param {String} config.notify_url 通知地址
   * @param {String} config.return_url h5支付回跳地址
   * @param {String} [config.pfx] p12证书文件内容
   */
  constructor(config) {
    this.config = config
    this.payload = {
      // appid: this.config.app_id,
      mch_id: this.config.mch_id,
      notify_url: this.config.notify_url,
      sign_type: 'MD5',
      nonce_str: '',
      trade_type: '',
      spbill_create_ip: ''
      // sign: '',
    }
  }

  verify(body, sign) {
    body = typeof body === 'string' ? util.parseXML(body) : body
    sign = sign || body.sign
    if (body.sign) {
      delete body.sign
    }
    return sign === util.generateSign(body, this.config.key)
  }
  success() {
    return '<xml><return_code>SUCCESS</return_code><return_msg>OK</return_msg></xml>'
  }
  fail(msg = 'error') {
    return `<xml><return_code>FAIL</return_code><return_msg><![CDATA[${msg}]]></return_msg></xml>`
  }
  find(order, type) {
    return this.__trade('/pay/orderquery', order, type)
  }
  cancel(order) {
    throw new GatewayException('Wechat Do Not Have Cancel API! Plase use Close API!')
  }
  close(order, type) {
    return this.__trade('/pay/closeorder', order, type)
  }
  refund(order, type) {
    if (order.total_fee) {
      order.total_fee *= 100
    }
    if (order.refund_fee) {
      order.refund_fee *= 100
    }
    
    return this.__trade('/secapi/pay/refund', order, type, this.config.pfx, this.config.mch_id)
  }
  __trade(pathinfo, order, type, pfx, passphrase) {
    const appids = {
      APP: this.config.appid,
      MINIAPP: this.config.miniapp_id
    }
    order = typeof order === 'string' ? { out_trade_no: order } : order
    let payload = Object.assign({}, this.payload)
    delete payload.notify_url
    delete payload.spbill_create_ip
    delete payload.trade_type
    payload.appid = appids[type] || this.config.app_id
    payload.nonce_str = util.createNonceStr()
    payload = Object.assign({}, payload, order)
    payload.sign = util.generateSign(payload, this.config.key)
    return util.request(pathinfo, payload, this.config.key, pfx, passphrase)
  }
}

function __call(name, params) {
  // 转换成分
  params.total_fee *= 100
  params.nonce_str = util.createNonceStr()
  const payload = Object.assign({}, this.payload, params)
  return new Gateways[`${name}Gateway`](this.config)
    .pay(payload)
}

methods.forEach(name => {
  Wechat.prototype[name] = function (...args) {
    return __call.call(this, name, ...args)
  }
})

module.exports = Wechat