/**
 * @file 状态模式。提供mock数据的方法。
 *
 * @author kikooo(kikooo_0421@163.com)
 */
const Long = require('long');

// https://github.com/nuysoft/Mock/blob/refactoring/src/mock/random/basic.js

/**
 * @type {'bool', 'byte', 'i16', 'i32', 'i64', 'double', 'string', 'binary' }
 */
const i8Max = 2 ** 8;
const i16Max = 2 ** 16;
const i32Max = 2 ** 32;

function ramdomNum(min, max) {
  const minNum = min ? parseInt(min, 10) : 0;
  const maxNum = max ? parseInt(max, 10) : 9007199254740992; // 2^53
  return Math.round(Math.random() * (maxNum - minNum)) + minNum;
}

function character(pool) {
  const pools = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    symbol: '!@#$%^&*()[]'
  };
  pools.alpha = pools.lower + pools.upper;
  pools.undefined = pools.lower + pools.upper + pools.number + pools.symbol;
  pool = pools[(`${pool}`).toLowerCase()] || pool;
  return pool.charAt(ramdomNum(0, pool.length - 1));
}

function string(pool, min, max) {
  let len;
  switch (arguments.length) {
    case 0: // ()
      len = ramdomNum(3, 10);
      break;
    case 1: // ( length )
      len = pool;
      pool = undefined;
      break;
    case 2:
      // ( pool, length )
      if (typeof pool === 'string') {
        len = min;
      } else {
        // ( min, max )
        len = ramdomNum(pool, min);
        pool = undefined;
      }
      break;
    case 3:
      len = ramdomNum(min, max);
      break;
    default:
      break;
  }

  let text = '';
  for (let i = 0; i < len; i++) {
    text += character(pool);
  }
  return text;
}

function bool() {
  return Math.random() >= 0.5;
}

function byte() {
  const char = character();
  const bytes = Buffer.from(char);
  const index = ramdomNum(0, bytes.length - 1);
  return bytes[index];
}

function i16() {
  return Math.floor(Math.random() * i16Max) - i8Max;
}

function i32() {
  return Math.floor(Math.random() * i32Max) - i16Max;
}

function i64() {
  return new Long(i32(), i32());
}

function double(min, max, dmin, dmax) {
  dmin = dmin === undefined ? 0 : dmin;
  dmin = Math.max(Math.min(dmin, 17), 0);
  dmax = dmax === undefined ? 17 : dmax;
  dmax = Math.max(Math.min(dmax, 17), 0);
  let ret = `${ramdomNum(min, max)}.`;
  for (let i = 0, dcount = ramdomNum(dmin, dmax); i < dcount; i++) {
    ret += (
      // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
      (i < dcount - 1) ? character('number') : character('123456789')
    );
  }
  return parseFloat(ret, 10);
}

function mvoid() {}

function binary() {
  const str = string();
  const result = [];
  const charList = str.split('');
  for (let i = 0; i < charList.length; i++) {
    if (i) {
      result.push(' ');
    }
    const binaryStr = charList[i].charCodeAt().toString(2);
    result.push(binaryStr);
  }
  return result.join('');
}

module.exports = {
  ramdomNum,
  string,
  bool,
  byte,
  i16,
  i32,
  i64,
  double,
  mvoid,
  binary,
};
