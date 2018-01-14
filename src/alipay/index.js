const util = require('./util')
const Gateways = {}
const methods = [
  'app',
  'web',
  'wap',
  'pos',
  'scan',
  'transfer'
]
methods.forEach(name => Gateways[`${name}Gateway`] = require(`./gateways/${name}.gateway`))

class Alipay {
  /**
   * 
   * @param {Object} config 构造参数
   * @param {String} config.app_id 商户app_id
   * @param {String} config.private_key 商户私钥
   * @param {String} config.public_key 支付宝公钥
   * @param {String} config.notify_url 通知地址
   * @param {String} config.return_url 回跳地址
   * @param {String} [config.dev] 设置此参数，将进入沙箱模式
   */
  constructor(config) {
    this.config = config
    this.payload = {
      app_id: this.config.app_id,
      notify_url: this.config.notify_url,
      return_url: this.config.return_url,
      charset: 'utf-8',
      sign_type: 'RSA2',
      version: '1.0',
      format: 'JSON',
      method: '',
      biz_content: ''
      // sign: ''
    }
  }
  verify(body, sign) {
    return util.verifySign(body, this.config.public_key, sign)
  }
  find(order) {
    return this.__trade('query', order)
  }
  cancel(order) {
    return this.__trade('cancel', order)
  }
  close(order) {
    return this.__trade('close', order)
  }
  refund(order) {
    return this.__trade('refund', order)
  }
  __trade(method, biz_content){
    const payload = Object.assign({}, this.payload)
    biz_content = typeof biz_content === 'string' ? { out_trade_no: biz_content } : biz_content
    payload.method = 'alipay.trade.' + method
    payload.biz_content = JSON.stringify(biz_content)
    payload.timestamp = util.getDateTime()
    payload.sign = util.generateSign(payload, this.config.private_key)
    return util.request(util.getGateway(this.config.dev), payload, this.config.public_key)
  }
}

function __call(name, biz_content) {
  const payload = Object.assign({}, this.payload)
  payload.biz_content = biz_content
  payload.timestamp = util.getDateTime()
  return new Gateways[`${name}Gateway`](this.config)
    .pay(util.getGateway(this.config.dev), payload)
}

methods.forEach(name => {
  Alipay.prototype[name] = function (...args) {
    return __call.call(this, name, ...args)
  }
})

module.exports = Alipay