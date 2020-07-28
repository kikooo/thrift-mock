/**
 * @file 生成mock
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */
const MockFuncs = require('./mockFunc');
const { getMockTreeNode } = require('./getMockTreeNode');

function mockByResponse(nodes, responseType) {
  // 最终生成mock数据的response函数
  if (typeof responseType === 'string') {
    switch (responseType) {
      case 'string':
        return MockFuncs.string();
      case 'bool':
        return MockFuncs.bool();
      case 'byte':
        return MockFuncs.byte();
      case 'i16':
        return MockFuncs.i16();
      case 'i32':
        return MockFuncs.i32();
      case 'i64':
        return MockFuncs.i64();
      case 'void':
        return MockFuncs.mvoid();
      case 'binary':
        return MockFuncs.mvoid();
      default:
        if (nodes[responseType] && nodes[responseType]._type === 'struct') {
          const res = {};
          Object.keys(nodes[responseType].value).forEach(key => {
            const item = nodes[responseType].value[key];
            res[key] = mockByResponse(nodes, item._type);
          });
          return res;
        }
        if (nodes[responseType] && nodes[responseType]._type === 'enum') {
          const enums = Object.values(nodes[responseType].value);
          return enums[Math.floor(Math.random() * enums.length)];
        }
    }
  } else {
    // 容器类型
    if (responseType.type === 'map') {
      const key = mockByResponse(nodes, responseType.struct[0]);
      const value = mockByResponse(nodes, responseType.struct[1]);
      const map = {};
      map[key] = value;
      return map;
      // return {[fn(keyType)]: fn(valueType)}
    }
    if (responseType.type === 'list' || responseType.type === 'set') {
      const list = [];
      const listLen = MockFuncs.ramdomNum(3, 10);
      for (let i = 0; i < listLen; i++) {
        list.push(mockByResponse(nodes, responseType.struct));
      }
      // return list;
      return responseType.type === 'set' ? new Set(list) : list;
    }
  }
  return '';
}

/**
 * @type { filePath string类型。thrift生成的js文件地址。}
 */
async function getMockByMethod(filePath, serviceName, methodName) {
  // filePath是thrift文件地址
  const { nodes, services } = await getMockTreeNode(filePath);
  const service = services[serviceName];
  const method = service[methodName];
  const responseType = method._response;

  const result = mockByResponse(nodes, responseType);
  return result;
}

module.exports = {
  getMockByMethod
};
