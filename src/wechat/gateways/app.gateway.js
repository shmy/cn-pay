const util = require('../util')
const mpGateway = require('./mp.gateway')

module.exports = class extends mpGateway{
  getAppId () {
    return this.config.appid
  }
  getTradeType () {
    return 'APP'
  }
  getOutPut(data) {
    const output = {
      appid: data.appid,
      partnerid: data.mch_id,
      prepayid: data.prepay_id,
      package: 'Sign=WXPay',
      noncestr: util.createNonceStr(),
      timestamp: parseInt(Date.now() / 1000).toString()
    }
    output.sign = util.generateSign(output, this.config.key)
    return output
  }
}