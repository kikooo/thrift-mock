/**
 * @file server
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

const thrift = require('thrift');
const Hello = require('./thrift/hello/gen-nodejs/TSayHelloService');

const server = thrift.createServer(Hello, {
  sayHello(data, callback) {
    console.log('sayHello()');
    console.log(data, data.name);
    callback(null, { success: true, data: { msg: `Hello ${data.name}` } });
  }
}, {});

server.listen(4060);

server.on('error', console.error);

server.on('listening', () => {
  const conn = thrift.createConnection('127.0.0.1', 4060);
  const client = thrift.createClient(Hello, conn);

  client.sayHello({ name: 'Thrift' }, console.log);
});
