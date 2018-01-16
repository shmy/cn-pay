'use strict';

const mpGateway = require('./mp.gateway');

module.exports = class extends mpGateway {
  getAppId() {
    return this.config.miniapp_id;
  }
  getTradeType() {
    return 'JSAPI';
  }
};
