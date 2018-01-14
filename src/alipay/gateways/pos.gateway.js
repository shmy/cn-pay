const util = require('../util')

module.exports = class {
  constructor(config) {
    this.config = config
  }
  pay(endpoint, payload) {
    payload.method = this.getMethod()
    payload.biz_content.product_code = this.getProductCode()
    payload.biz_content = JSON.stringify(payload.biz_content)
    payload.sign = util.generateSign(payload, this.config.private_key)
    return util.request(endpoint, payload, this.config.public_key)
  }
  getMethod() {
    return 'alipay.trade.pay'
  }
  getProductCode() {
    return 'FACE_TO_FACE_PAYMENT'
  }
}