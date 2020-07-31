'use strict';

const fs = require('fs');
const path = require('path');
const util = require('./util');

function getTargetFile(targetPath) {
  const paths = [
    `${targetPath}.js`,
    `${targetPath}/index.js`,
    `${targetPath}.json`,
  ];
  for (let i = 0; i < paths.length; i++) {
    if (fs.existsSync(paths[i])) {
      return {
        data: require(paths[i]),
        path: paths[i],
      };
    }
  }
}

module.exports = (key, value) => {
  const targetPath = value.replace(/\/+$/, '');
  const matchReg = util.getMatchRegExp(key);
  return async (ctx, next) => {
    if (matchReg.test(ctx.path)) {
      const filePath = path.join(targetPath, ctx.path).replace(/\/+$/, '');
      const target = getTargetFile(filePath);
      if (target) {
        ctx.logger.info(`[proxy local mock] TO ${target.path}`);
        if (typeof target.data === 'function') {
          // 用到了再改罢
          return target.data(ctx);
        }
        return target.data;
      }
    }
    await next();
  };
};
