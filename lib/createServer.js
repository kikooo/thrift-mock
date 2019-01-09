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
      const service = cfgs[filePath].services[services[i]];
      const serviceFile = require(`./thrift/${filePath}/gen-nodejs/${service}`);
      // TODO: 根据service获取methodList
      const methodList = getMockMethodMap(`./thrift/${filePath}/gen-nodejs/${service}`);
      initServer(serviceFile, methodList, {});
    }
  }
}

// function createServerByFiles(filePaths = []) {
//   // filePaths存储文件路径，遍历filePaths
//   for (let index = 0; index < filePaths.length; index++) {
//     const filePath = filePaths[index];
//     // 从文件中获取service列表。。
//   }
// }

module.exports = {
  initServer,
  createServer,
};
