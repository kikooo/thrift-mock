// 配置文件样例
export default {
  thrift: {
    servers: {
      hello: {
        poolOptions: {
          remoteAppKey: 'hello.test',
        },
        services: {
          TSayHelloService: {
            service: 'TSayHelloService',
            options: {
              ports: [9004],
            },
          },
          TReplyService: {
            service: 'TReplyService',
            options: {
              ports: [9005],
            },
          },
        },
      },
      test: {
        poolOptions: {
          remoteAppKey: 'test.test',
        },
        services: {
          TTestService: {
            service: 'TTestService',
            options: {
              ports: [9006],
            },
          },
        },
      },
    }
  }
};