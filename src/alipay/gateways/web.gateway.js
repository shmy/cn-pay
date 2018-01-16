'use strict';

const util = require('../util');

module.exports = class {
  constructor(config) {
    this.config = config;
  }
  pay(endpoint, payload) {
    payload.method = this.getMethod();
    payload.biz_content.product_code = this.getProductCode();
    payload.biz_content = JSON.stringify(payload.biz_content);
    payload.sign = util.generateSign(payload, this.config.private_key);
    const html = util.buildFormHTML(endpoint, payload);
    return Promise.resolve({ html, payload, endpoint });
  }
  getMethod() {
    return 'alipay.trade.page.pay';
  }
  getProductCode() {
    return 'FAST_INSTANT_TRADE_PAY';
  }
};
