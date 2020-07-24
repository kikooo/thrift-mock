const path = require('path');
const { getMockTreeNode } = require('../lib/getMockTreeNode');

getMockTreeNode(path.resolve('./test/thrift/hello/hello.thrift'));
