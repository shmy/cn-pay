'use strict';

const mpGateway = require('./mp.gateway');
module.exports = class extends mpGateway {
  getOutPut(data) {
    return data;
  }
  getTradeType() {
    return 'NATIVE';
  }
};
