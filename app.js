'use strict';

const { getMockByMethod } = require('./lib/mock');
const { getMockTreeNode } = require('./lib/getMockTreeNode');


class ThriftMocker {
  /**
   * 
   * @param {Object=} [options={}] 参数
   * @param {string} options.clientId 应用 ID
   * @param {string} options.clientSecret 应用 密钥
   * @param {string} options.callbackUri 登录回调地址
   */
  constructor(options = {}) {
    this.services = options;
    for (const k in options) {
      if (Object.prototype.hasOwnProperty.call(options, k) && k !== 'default') {
        getMockTreeNode(options[k].idl);
      }
    }
  }

  request(serviceName, methodName) {
    const filePath = this.services[serviceName].idl;
    return getMockByMethod(filePath, serviceName, methodName)
  }
}

module.exports = app => {
  const config = app.config.thriftMock;
  app.thriftMocker = new ThriftMocker(config);
};