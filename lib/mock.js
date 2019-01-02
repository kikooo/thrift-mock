/**
 * @file 生成mock
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

const fs = require('fs');

/**
 * @type { filePath string类型。thrift文件地址。}
 */
function getMockMethodMap(filePath) {
  const methodList = {};
  let data = fs.readFileSync(filePath, 'utf-8');
  data = data.replace(/\.export.*?\.thrift/, '.export');
  return methodList;
}