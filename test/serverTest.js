var TSayHelloService = require('./thrift/hello/gen-nodejs/TSayHelloService');
var ttypes = require('./thrift/hello/gen-nodejs/hello_types');
var thrift = require('thrift');

var connection = thrift.createConnection('localhost', 9903, {
  transport: thrift.TBufferedTransport(),
  protocol: thrift.TBinaryProtocol()
});

connection.on('error', function(err) {
  console.log(err);
});

var client = thrift.createClient(TSayHelloService, connection);

client.testRequest(1, 2, {}, console.log);
