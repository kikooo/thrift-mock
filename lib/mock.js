/**
 * @file 生成mock
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

const getMockTreeNode = require('./getMockTreeNode');

function getMockByMethod(tree) {

}

/**
 * @type { filePath string类型。thrift生成的js文件地址。}
 */
function getMockMethodMap(filePath) {
  const methodMap = {};
  const service = require(filePath);
  const tree = getMockTreeNode(filePath);
  const methodList = Object.keys(service.Processor.prototype);
  methodList.splice(methodList.indexOf('process'), 1);

  methodList.forEach(item => {
    methodMap[item] = getMockByMethod(tree[item]);
  });
  return methodMap;
}

module.exports = {
  getMockMethodMap
};
