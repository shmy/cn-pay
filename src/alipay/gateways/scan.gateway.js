const PosGateway = require('./pos.gateway')

module.exports = class extends PosGateway {
  getMethod() {
    return 'alipay.trade.precreate'
  }
  getProductCode() {
    return ''
  }
}
