// 配置文件样例
module.exports = {
  thrift: {
    servers: {
      TSayHelloService: {
        idl: 'test/thrift/hello/hello.thrift',
        service: require('./thrift/hello/gen-nodejs/TSayHelloService'),
        port: 9903
      }
  //     hello: {
  //       poolOptions: {
  //         remoteAppKey: 'hello.test',
  //       },
  //       services: {
  //         TSayHelloService: {
  //           service: 'TSayHelloService',
  //           options: {
  //             ports: [9004],
  //           },
  //         },
  //         TReplyService: {
  //           service: 'TReplyService',
  //           options: {
  //             ports: [9005],
  //           },
  //         },
  //       },
  //     },
  //     test: {
  //       poolOptions: {
  //         remoteAppKey: 'test.test',
  //       },
  //       services: {
  //         TTestService: {
  //           service: 'TTestService',
  //           options: {
  //             ports: [9006],
  //           },
  //         },
  //       },
  //     },
    }
  }
};
