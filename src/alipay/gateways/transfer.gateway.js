const PosGateway = require('./pos.gateway')

module.exports = class extends PosGateway {
  getMethod() {
    return 'alipay.fund.trans.toaccount.transfer'
  }
  getProductCode() {
    return ''
  }
}