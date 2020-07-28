/**
 * @file server
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

const thrift = require('thrift');
const { getMockByMethod } = require('./mock');
const { getMockTreeNode } = require('./getMockTreeNode');

function initServer(service, serviceName, methodList, idl, port = 9527) {
  const serviceList = {};
  methodList.forEach(method => {
    serviceList[method] = async function request () {
      const callback = arguments[arguments.length - 1];
      const response = await getMockByMethod(idl, serviceName, method);
      callback(null, response);
    }
  });
  const server = thrift.createServer(service, serviceList, {});
  server.listen(port);
  server.on('error', console.error);
  return server;
}

/**
 * @type {}
 */
async function createServer(cfgs = {}) {
  for (const service in cfgs) {
    if (Object.prototype.hasOwnProperty.call(cfgs, service)) {
      const { services } = await getMockTreeNode(cfgs[service].idl);
      const methodList = Object.keys(services[service]);
      const server = initServer(cfgs[service].service, service, methodList, cfgs[service].idl, cfgs[service].port);
    }
  }
}

module.exports = {
  initServer,
  createServer,
};
