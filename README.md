# thrift-mock

thrift请求的mock服务，开发时在本地启动mock服务器。

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