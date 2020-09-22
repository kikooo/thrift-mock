

module.exports = {
  isThriftMock(path) {
    return /^\/thrift-mock\//.test(path);
  },
  getMatchRegExp(key) {
    return new RegExp(`^/thrift-mock/${key}/(\\S*)`);
  },
};
