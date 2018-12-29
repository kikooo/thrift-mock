/**
 * @file server
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */

import thrift from 'thrift';

let server = thrift.createServer(Hello, {
    say(name, callback){
      callback(null, 'Hello ' + name);
    }
  }, {});

server.listen(7800);

server.on('error', console.error);

server.on('listening', () => {

  let conn = thrift.createConnection('127.0.0.1', 7800);
  let client = thrift.createClient(Hello, conn);
  
  client.say('Thrift', console.log);
  // null 'Hello Thrift'
});