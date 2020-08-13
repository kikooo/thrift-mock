/**
 * @file index
 *
 * @author kikooo(kikooo_0421@163.com)
 */
// 示例
const { createServer } = require('./lib/createServer');
const { getMockTreeNode } = require('./lib/getMockTreeNode');
const { getMockByMethod } = require('./lib/mock');
const MockFuncs = require('./lib/mockFunc');

// let cfgs = require('./test/config');
// createServer(cfgs.thrift.servers);

module.exports = {
  MockFuncs,
  getMockByMethod,
  getMockTreeNode,
  createServer
};
