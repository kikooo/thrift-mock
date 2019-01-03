/**
 * @file 获取mock的树结构。
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */
const fs = require('fs');
const readline = require('readline');


let input = fs.createReadStream(filepath)
const rl = readline.createInterface({
  input: input
});
// rl.on('line', (line) => {
//   console.log(`Line from file: ${line}`);
// });
// rl.on('close', (line) => {
//   console.log("读取完毕！");
// });

function getMockTreeNode(filePath) {

}

module.exports = {
  getMockTreeNode
};
