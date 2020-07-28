/**
 * @file 启动文件
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

// const thrift = require('thrift');
const { createServer } = require('./lib/createServer');

// 配置示例
let cfgs = require('./test/config');

if (typeof cfgs === 'string') {
  cfgs = JSON.parse(cfgs);
}

createServer(cfgs.thrift.servers);
