/**
 * @file thrift文件读取。获取mock的树结构。
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

function typeProcess(str) {
  str = str.trim();
  const matchResult = str.match(/(map|set|list)<([\w\W]*)>/);
  if (!matchResult) {
    return str;
  }
  const type = matchResult[1];
  let struct = matchResult[2];
  if (type === 'map' && struct.split(',').length > 0) {
    struct = struct.split(',');
    for (let i = 0; i < struct.length; i++) {
      struct[i] = typeProcess(struct[i]);
    }
  }
  return { type, struct };
}

// 需要传入thrift文件地址
function getMockTreeNode(filePath) {
  return new Promise((resolve, reject) => {
    try {
      // 记录上次修改时间
      const stats = fs.statSync(filePath);
      const lastModifiedTime = stats.mtimeMs.toString();

      // 要生成的文件的路径
      const thriftFileName = path.basename(filePath, '.thrift');
      const nodeFilePath = path.resolve(filePath, `../${thriftFileName}_nodes.json`);

      if (fs.existsSync(nodeFilePath)) {
        let data = fs.readFileSync(nodeFilePath, 'utf-8');
        data = JSON.parse(data);
        if (data.lastModifiedTime && data.lastModifiedTime === lastModifiedTime) {
          resolve(data);
        }
      }

      const input = fs.createReadStream(filePath);

      const rl = readline.createInterface({
        input
      });
      const tree = {};
      const services = {};

      // initial value
      let editingName = '';
      let isCommenting = false;

      rl.on('line', line => {
        line = line.trim();
        // Process Comment
        if (isCommenting && line.indexOf('*/') < 0) {
          // Its a COMMENT LINE, do nothing.
          line = '';
        } else if (isCommenting && line.indexOf('*/') >= 0) {
          line = line.substring(line.indexOf('*/') + 2, line.length);
          isCommenting = false;
        } else if (line.indexOf('//') >= 0) {
          // 过滤双斜线的注释
          line = line.substring(0, line.indexOf('//')).trim();
        } else if (line.indexOf('/*') >= 0) {
          line = line.substring(0, line.indexOf('/*'));
          isCommenting = true;
        }

        if (line === '}') {
          editingName = '';
        } else if (editingName) {
          if (tree[editingName] && tree[editingName]._type === 'enum') {
            const key = line.match(/(\w*)\s=/)[1];
            const value = line.match(/=\s(\w*),?$/)[1];
            tree[editingName].value[key] = Number(value);
          } else if (tree[editingName] && tree[editingName]._type === 'struct') {
            let type = line.match(/:\s*([\w|<|>]*)\s/)[1];
            type = typeProcess(type);

            const name = line.match(/\s(\w*),?$/)[1];
            tree[editingName].value[name] = {
              _type: type,
              _name: name,
            };
          } else if (services[editingName]) {
            const serviceMatch = line.match(/\s(\S*)\(/);
            const serviceName = serviceMatch[1];

            let responseType = line.substring(0, serviceMatch.index);
            responseType = typeProcess(responseType);

            const requestNodesStrs = line.match(/\(([^)]*)\)/)[1].split(/\s*[\d]\s*:\s*/);
            requestNodesStrs.shift();
            const requestNodes = {};
            for (let i = 0; i < requestNodesStrs.length; i++) {
              const requestNodesStr = requestNodesStrs[i].trim();
              let type = requestNodesStr.match(/^([\w|<|>|,|\s]*)\s/)[1];
              type = typeProcess(type);

              const name = requestNodesStr.match(/\s(\w*),?$/)[1];
              requestNodes[name] = {
                _type: type,
                _name: name,
              };
            }
            services[editingName][serviceName] = {
              _request: requestNodes,
              _name: serviceName,
              _response: responseType,
            };
          }
        } else {
          const enumMatch = line.match(/enum\s([\w]*)\s\{/);
          const structMatch = line.match(/struct\s([\w]*)\s\{/);
          const serviceMatch = line.match(/service\s([\w]*)\s\{/);
          if (enumMatch) {
            [, editingName] = enumMatch;
            tree[editingName] = {
              _type: 'enum',
              _name: editingName,
              value: {},
            };
          } else if (structMatch) {
            [, editingName] = structMatch;
            tree[editingName] = {
              _type: 'struct',
              _name: editingName,
              value: {},
            };
          } else if (serviceMatch) {
            [, editingName] = serviceMatch;
            services[serviceMatch[1]] = {};
          }
        }
      });
      rl.on('close', () => {
        const streamWriter = fs.createWriteStream(nodeFilePath);
        streamWriter.write(JSON.stringify({ lastModifiedTime, nodes: tree, services }) + os.EOL);
      });
      resolve({ nodes: tree, services });
    } catch (error) {
      reject(error);
    }
  });
}


module.exports = {
  getMockTreeNode
};
