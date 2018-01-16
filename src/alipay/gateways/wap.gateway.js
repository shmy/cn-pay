'use strict';

const WebGateway = require('./web.gateway');

module.exports = class extends WebGateway {
  getMethod() {
    return 'alipay.trade.wap.pay';
  }
  getProductCode() {
    return 'QUICK_WAP_WAY';
  }
};
