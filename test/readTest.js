const path = require('path');
const { getMockTreeNode } = require('../lib/getMockTreeNode');

getMockTreeNode(path.resolve('./test/thrift/hello/hello.thrift')).then(res => {
  console.log(123, res);
});


console.log(getMockTreeNode(path.resolve('./test/thrift/hello/hello.thrift')));