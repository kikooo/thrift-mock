const fs = require('fs');
const util = require('./util');

function getTargetFile(targetPath) {
  const paths = [
    `${targetPath}.js`,
    `${targetPath}/index.js`,
    `${targetPath}.json`,
    targetPath
  ];
  for (let i = 0; i < paths.length; i++) {
    if (fs.existsSync(paths[i])) {
      return {
        data: require(paths[i]),
        path: paths[i],
      };
    }
  }
  return null;
}

module.exports = (key, value) => {
  const targetPath = value.replace(/\/+$/, '');
  const matchReg = util.getMatchRegExp(key);
  return async (ctx, next) => {
    if (matchReg.test(ctx.path)) {
      const target = getTargetFile(targetPath);
      if (target) {
        ctx.logger.info(`[proxy local mock] TO ${target.path}`);
        if (typeof target.data === 'function') {
          // 用到了再改罢
          ctx.body = target.data(ctx);
        }
        ctx.body = target.data;
      } else {
        return Promise.reject(new Error('No file'));
      }
    } else {
      await next();
    }
    return undefined;
  };
};
