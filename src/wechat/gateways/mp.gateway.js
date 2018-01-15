const util = require('../util')

module.exports = class {
  constructor(config) {
    this.config = config
  }
  pay(payload) {
    payload.appid = this.getAppId()
    payload.trade_type = this.getTradeType()
    // payload.spbill_create_ip = '192.168.1.1'
    payload.sign = util.generateSign(payload, this.config.key)
    return new Promise((resolve, reject) => {
      util.request('/pay/unifiedorder', payload)
      .then(data => resolve(this.getOutPut(data)))
      .catch(reject)
    })
  }
  getAppId () {
    return this.config.app_id
  }
  getTradeType () {
    return 'JSAPI'
  }
  getOutPut (data) { 
    const output = {
      appId: data.appid,
      package: 'prepay_id=' + data.prepay_id,
      timeStamp: parseInt(Date.now() / 1000).toString(),
      nonceStr: util.createNonceStr(),
      signType: 'MD5'
    }
    output.paySign = util.generateSign(output, this.config.key)
    return output
  }
}