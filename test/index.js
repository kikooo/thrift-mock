/**
 * @file server
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

const thrift = require('thrift');
const Hello = require('./thrift/hello/gen-nodejs/TSayHelloService');
// const helloTypes = require('./thrift/hello/gen-nodejs/hello_types');

const server = thrift.createServer(Hello, {
  sayHello(data, callback) {
    console.log('sayHello()');
    // console.log(Hello.ttypes);
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
