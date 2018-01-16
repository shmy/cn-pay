const util = require('../util')

module.exports = class {
  constructor(config) {
    this.config = config
  }
  pay(payload) {
    delete payload.notify_url
    delete payload.trade_type
    payload.appid = this.config.app_id
    payload.sign = util.generateSign(payload, this.config.key)
    return new Promise((resolve, reject) => {
      util.request('/pay/micropay', payload, this.config.key)
        .then(data => resolve(data))
        .catch(reject)
    })
  }
}