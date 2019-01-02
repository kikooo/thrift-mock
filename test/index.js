/**
 * @file server
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

// import thrift from 'thrift';

// import Hello from './thrift/hello/gen-nodejs/TSayHelloService';
// import types from './thrift/hello/gen-nodejs/hello_types';

const thrift = require('thrift');
const Hello = require('./thrift/hello/gen-nodejs/TSayHelloService');

const server = thrift.createServer(Hello, {
  sayHello(name, callback) {
    console.log('sayHello()');
    callback(null, `Hello ${name}`);
  }
}, {});

server.listen(4060);

server.on('error', console.error);

server.on('listening', () => {
  const conn = thrift.createConnection('127.0.0.1', 4060);
  const client = thrift.createClient(Hello, conn);

  client.sayHello('Thrift', console.log);
});
