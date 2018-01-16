'use strict';

const util = require('../util');

module.exports = class {
  constructor(config) {
    this.config = config;
  }
  pay(endpoint, payload) {
    payload.method = 'alipay.trade.app.pay';
    payload.biz_content.product_code = 'QUICK_MSECURITY_PAY';
    payload.biz_content = JSON.stringify(payload.biz_content);
    payload.sign = util.generateSign(payload, this.config.private_key);
    const result = util.stringify(payload, '&', '=');
    return Promise.resolve(result);
  }
};
