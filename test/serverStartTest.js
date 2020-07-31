const { createServer } = require('../lib/createServer');

// 配置示例
let cfgs = require('./config');

if (typeof cfgs === 'string') {
  cfgs = JSON.parse(cfgs);
}

createServer(cfgs.thrift.servers);