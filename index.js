'use strict';

const Alipay = require('./src/alipay');
const Wechat = require('./src/wechat');

module.exports = class {
  static alipay(...args) {
    return new Alipay(...args);
  }
  static wechat(...args) {
    return new Wechat(...args);
  }
};
