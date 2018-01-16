'use strict';

const PosGateway = require('./pos.gateway');

module.exports = class extends PosGateway {
  getScene() {
    return '';
  }
  getMethod() {
    return 'alipay.trade.precreate';
  }
  getProductCode() {
    return '';
  }
};
