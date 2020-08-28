# egg-thrift-mock

thrift请求的mock服务，支持多种使用方式。

## 基本配置Config

```javascript
config.thriftMock = {
  TGatewayCityMappingService: {
    idl: path.join(appInfo.baseDir, '/app/service/city-id-transition/CityIdTransition.thrift'),
    service: require('../app/service/city-id-transition/gen-nodejs/TGatewayCityMappingService'),
    port: 9903,
    mockFile: '/app/service/city-id-transition/CityIdTransition.json'
  }
};
```

## 使用方式
### 方式一：开发时在本地启动mock服务器
```javascript
// start.js
const { createServer } = require('egg-thrift-mock');

/* 配置示例
  {
    TSayHelloService: {
      idl: 'test/thrift/hello/hello.thrift',
      service: require('./thrift/hello/gen-nodejs/TSayHelloService'),
      port: 9903
    },
  }
*/
let cfgs = require('./config');

if (typeof cfgs === 'string') {
  cfgs = JSON.parse(cfgs);
}

createServer(cfgs);
```

### 方式二：作为egg插件使用全局对象
```javascript
// app/controller/thrift.js
module.exports = app => class ThriftController extends app.Controller {
  async test() {
    const result = await app.thriftMocker.request('TGatewayCityMappingService', 'getMtCityIdByDpCityId');

    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: result
    };
  }
};
```

### 方式三：作为egg插件做中间件使用
建议搭配`egg-datasource`使用。直接请求即可。
url举例：
```javascript
const mockUrl = `http://${localhost}/thrift-mock/${serviceName}/${methodName}`
```

### 方式四：自定义数据mock方法
详见`example/custom-mock-example.js`。

## 其他
**欢迎各类纠错和补充。谢谢大家~**