/**
 * @file server
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

const thrift = require('thrift');
const { getMockByMethod } = require('./mock');


function initServer(service, serviceName, methodList, idl, port = 9527) {
  const serviceList = {};
  for(const method in methodList) {
    if (Object.prototype.hasOwnProperty.call(cfgs, service)) {
      serviceList[method] = () => {
        return getMockByMethod(idl, serviceName, method);
      }
    }
  }
  const server = thrift.createServer(service, serviceList, {});
  server.listen(port);
  server.on('error', console.error);
  return server;
}

/**
 * @type {}
 */
function createServer(cfgs = {}) {
  for (const service in cfgs) {
    if (Object.prototype.hasOwnProperty.call(cfgs, service)) {
      const { services } = await getMockTreeNode(cfgs[service].idl);
      const methodList = Object.keys(services[service]);
      initServer(cfgs[service].service, service, methodList, idl, cfgs[service].port);
    }
  }
}

module.exports = {
  initServer,
  createServer,
};
