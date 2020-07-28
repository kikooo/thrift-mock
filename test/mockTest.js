const path = require('path');
const { getMockByMethod } = require('../lib/mock');

async function test () {
  const aaa = await getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sayHello');
  const bbb = await getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sayHello');
  const ccc = await getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'sssssss');
  const ddd = await getMockByMethod(path.resolve('./test/thrift/hello/hello.thrift'), 'TSayHelloService', 'testMap');

  console.log(aaa, bbb, ccc, ddd);
}

test();