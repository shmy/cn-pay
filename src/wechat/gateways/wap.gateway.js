'use strict';

const mpGateway = require('./mp.gateway');

module.exports = class extends mpGateway {
  getOutPut(data) {
    data = data.mweb_url;
    if (this.config.return_url) {
      data += '&redirect_url=' + encodeURIComponent(this.config.return_url);
    }
    return data;
  }
  getTradeType() {
    return 'MWEB';
  }
};
