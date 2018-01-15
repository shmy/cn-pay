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
   * @param {String} [config.dev] 【弃用】设置此参数，将进入沙箱模式
   */
  constructor(config) {
    this.config = config
    this.payload = {
      // appid: this.config.app_id,
      mch_id: this.config.mch_id,
      notify_url: this.config.notify_url,
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
}

function __call(name, params) {
  // 转换成分
  params.total_fee = params.total_fee * 100
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