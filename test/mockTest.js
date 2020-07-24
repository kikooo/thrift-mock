const path = require('path');
const { getMockByMethod } = require('../lib/mock');

const aaa = getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sayHello');
const bbb = getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sayHello');

console.log(aaa, bbb);
