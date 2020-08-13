const path = require('path');
const { getMockTreeNode } = require('../lib/getMockTreeNode');

// getMockTreeNode(path.resolve('./test/thrift/hello/hello.thrift')).then(res => {
//   console.log(123, res);
// });

getMockTreeNode(path.resolve('./test/thrift/test/CityIdTransition.thrift')).then(res => {
  console.log(123, res);
});
