const appGateway = require('./app.gateway')
module.exports = class extends appGateway{
  getOutPut (data) { 
    return data
  }
  getTradeType () {
    return 'JSAPI'
  }
}