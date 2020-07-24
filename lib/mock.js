/**
 * @file 生成mock
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */
const MockFuncs = require('./mockFunc');
const { getMockTreeNode } = require('./getMockTreeNode');

function mockByResponse(nodes, responseType) {
  // 最终生成mock数据的response函数
  if(typeof responseType === 'string') {
    switch (responseType) {
      case 'string':
        return MockFuncs.string();
      case 'bool':
        return MockFuncs.bool();
      case 'i32':
        return MockFuncs.i32();
      case 'i64':
        return MockFuncs.i64();
      default:
        if(nodes[responseType] && nodes[responseType]._type === 'struct') {
          const res = {};
          Object.keys(nodes[responseType].value).map(key => {
            let item = nodes[responseType].value[key];
            res[key] = mockByResponse(nodes, item._type);
          })
          return res;
        } else if(nodes[responseType] && nodes[responseType]._type === 'enum') {
          const enums = Object.values(nodes[responseType].value);
          return enums[Math.floor(Math.random() * enums.length)];
        }
    }
  }
}

/**
 * @type { filePath string类型。thrift生成的js文件地址。}
 */
function getMockByMethod(filePath, serviceName, methodName) {
  // filePath是thrift文件地址
  const { nodes, services } = getMockTreeNode(filePath);
  const service = services[serviceName];
  const method = service[methodName];
  const responseType = method._response;

  const result = mockByResponse(nodes, responseType);
  return result;
}

module.exports = {
  getMockByMethod
};
