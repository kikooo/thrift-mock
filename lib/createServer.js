/**
 * @file server
 *
 * @author kikooo(kikooo_0421@163.com)
 */

const thrift = require('thrift');
const { getMockByMethod } = require('./mock');
const { getMockTreeNode } = require('./getMockTreeNode');

function initServer(service, serviceName, methodList, idl, port = 9527) {
  const serviceList = {};
  methodList.forEach(method => {
    serviceList[method] = async function request(...args) {
      const callback = args[args.length - 1];
      const response = await getMockByMethod(idl, serviceName, method);
      callback(null, response);
    };
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
  const promises = [];
  Object.keys(cfgs).forEach(service => {
    promises.push(getMockTreeNode(cfgs[service].idl).then(res => {
      const { services } = res;
      const methodList = Object.keys(services[service]);
      initServer(cfgs[service].service, service, methodList, cfgs[service].idl, cfgs[service].port);
    }));
  });
  Promise.all(promises);
}

module.exports = {
  initServer,
  createServer,
};
