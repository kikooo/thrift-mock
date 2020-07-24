/**
 * @file 状态模式。提供mock数据的方法。
 *
 * @author kikooo(wenyunyan@maoyan.com)
 */
const Long = require('long');

// https://github.com/nuysoft/Mock/blob/refactoring/src/mock/random/basic.js

/**
 * @type {'bool', 'byte', 'i16', 'i32', 'i64', 'double', 'string', 'binary' }
 */
const i8Max = 2 ** 8;
const i16Max = 2 ** 16;
const i32Max = 2 ** 32;

const MockState = () => {
  const fns = {
    string: () => 'aaa',
    bool: () => Math.random() >= 0.5,
    i16: () => Math.floor(Math.random() * i16Max) - i8Max,
    i32: () => Math.floor(Math.random() * i32Max) - i16Max,
    i64: () => new Long(fns.i32(), fns.i32()),
    // byte: () => (),
    double: (min, max, dmin, dmax) => {
      dmin = dmin === undefined ? 0 : dmin
      dmin = Math.max(Math.min(dmin, 17), 0)
      dmax = dmax === undefined ? 17 : dmax
      dmax = Math.max(Math.min(dmax, 17), 0)
      var ret = this.integer(min, max) + '.';
      for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
          ret += (
              // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
              (i < dcount - 1) ? this.character('number') : this.character('123456789')
          )
      }
      return parseFloat(ret, 10)
    },
    // binary: () => (),
    map: () => {},
    set: () => new Set(),
    list: () => [],
  };
  return fns;
};

const MockFuncs = MockState();

module.exports = MockFuncs;
