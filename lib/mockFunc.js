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
function Mock() {

}

const i8Max = Math.pow(2, 8);
const i16Max = Math.pow(2, 16);
const i32Max = Math.pow(2, 32);
const i64Max = Math.pow(2, 64);

const MockState = () => {
  const fns = {
    string: () => 'aaa',
    bool: () => Math.random() >= 0.5,
    i16: () => Math.floor(Math.random() * i16Max) - i8Max,
    i32: () => Math.floor(Math.random() * i32Max) - i16Max,
    i64: () => new Long(this.i32(), this.i32()),
  };
};

module.exports = Mock;
