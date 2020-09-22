const path = require('path');
const localMock = require('./lib/local-mock');
const util = require('./lib/util');
const { getMockByMethod } = require('./lib/mock');
const { getMockTreeNode } = require('./lib/getMockTreeNode');


class ThriftMocker {
  constructor(options = {}) {
    this.services = options;
    Object.keys(options).forEach(k => {
      getMockTreeNode(options[k].idl);
    });
  }

  request(serviceName, methodName) {
    const filePath = this.services[serviceName].idl;
    return getMockByMethod(filePath, serviceName, methodName);
  }
}

const thriftMock = (key, conf) => {
  const matchReg = util.getMatchRegExp(key);
  const { idl } = conf;
  return async function thriftProxy(ctx, next) {
    if (util.isThriftMock(ctx.path) && matchReg.exec(ctx.path)) {
      const methodName = matchReg.exec(ctx.path)[1];
      ctx.logger.info(`[thrift mock] TO ${key}-${methodName}`);

      try {
        const result = await getMockByMethod(idl, key, methodName);
        ctx.body = result;
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      await next();
    }
    return undefined;
  };
};

function useMiddleware(app, k, conf) {
  if (conf.mockFile) {
    // 本地文件 mock，支持 .js/.json
    const targetPath = path.join(app.baseDir, conf.mockFile);
    app.use(localMock(k, targetPath));
  } else {
    app.use(thriftMock(k, conf));
  }
}

module.exports = app => {
  const config = app.config.thriftMock;
  app.thriftMocker = new ThriftMocker(config);

  Object.keys(config).forEach(k => {
    useMiddleware(app, k, config[k]);
  });
};
