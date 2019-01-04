/**
 * @file server
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

const thrift = require('thrift');
const { getMockMethodMap } = require('./mock');


function initServer(service, serviceList, port) {
  const server = thrift.createServer(service, serviceList, {});

  server.listen(port);

  server.on('error', console.error);

  return server;
}

/**
 * @type {}
 * {
      test: {
        poolOptions: {
          remoteAppKey: 'test.test',
        },
        services: {
          TTestService: {
            service: 'TTestService',
            options: {
              ports: [9006],
            },
          },
        },
      },
    }
 */
function createServer(cfgs = {}) {
  const filePaths = Object.keys(cfgs);
  for (let index = 0; index < filePaths.length; index++) {
    const filePath = filePaths[index];
    const services = Object.keys(cfgs[filePath].services);
    for (let i = 0; i < services.length; i++) {
      const service = cfgs[filePath].services[services[i]];
      const serviceFile = require(`./thrift/${filePath}/gen-nodejs/${service.service}`);
      const methodList = getMockMethodMap(`./thrift/${filePath}/gen-nodejs/${service.service}`);
      initServer(serviceFile, methodList, {});
    }
  }
}

module.exports = {
  initServer,
  createServer,
};
