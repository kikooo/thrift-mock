const path = require('path');
const { getMockByMethod } = require('../lib/mock');

const aaa = getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sayHello');
const bbb = getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sayHello');
const ccc = getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sssssss');
const ddd = getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'testMap');

console.log(aaa, bbb, ccc, ddd);
