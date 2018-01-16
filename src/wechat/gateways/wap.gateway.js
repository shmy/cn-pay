'use strict';

const mpGateway = require('./mp.gateway');

module.exports = class extends mpGateway {
  getOutPut(data) {
    if (this.config.return_url) {
      data.mweb_url += '&redirect_url=' + encodeURIComponent(this.config.return_url);
    }
    return data;
  }
  getTradeType() {
    return 'MWEB';
  }
};
