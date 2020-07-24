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
        services: {
          TTestService: {
            ports: [9006],
          },
        },
      },
      ...
    }
 */
function createServer(cfgs = {}) {
  const filePaths = Object.keys(cfgs);
  for (let index = 0; index < filePaths.length; index++) {
    // 文件夹名
    const filePath = filePaths[index];
    const services = Object.keys(cfgs[filePath].services);
    for (let i = 0; i < services.length; i++) {
      // service名，如TSayHelloService
      // TODO: 一个service对应一个端口！！！！！需要创建一个server！！！！
      // const service = cfgs[filePath].services[services[i]];
      // TODO: 根据service获取methodList
      const methodList = getMockMethodMap(
        `../test/thrift/${filePath}/gen-nodejs/${services[i]}`,
        cfgs[filePath].services[services[i]]
      );
      // console.log(methodList);
      // initServer(serviceFile, methodList, {});
    }
  }
}

module.exports = {
  initServer,
  createServer,
};
