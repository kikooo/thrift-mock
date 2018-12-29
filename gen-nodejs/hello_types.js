//
// Autogenerated by Thrift Compiler (0.11.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
ttypes.TGender = {
  'MALE' : 1,
  'FEMALE' : 2,
  'UNKNOWN' : 3
};
ttypes.THelloType = {
  'HI' : 1,
  'HELLO' : 2,
  'WELCOME' : 3
};
var Error = module.exports.Error = function(args) {
  this.code = null;
  this.message = null;
  if (args) {
    if (args.code !== undefined && args.code !== null) {
      this.code = args.code;
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Error.prototype = {};
Error.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.code = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Error.prototype.write = function(output) {
  output.writeStructBegin('Error');
  if (this.code !== null && this.code !== undefined) {
    output.writeFieldBegin('code', Thrift.Type.I64, 1);
    output.writeI64(this.code);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var THelloMessage = module.exports.THelloMessage = function(args) {
  this.gender = null;
  this.helloMsg = null;
  if (args) {
    if (args.gender !== undefined && args.gender !== null) {
      this.gender = args.gender;
    }
    if (args.helloMsg !== undefined && args.helloMsg !== null) {
      this.helloMsg = args.helloMsg;
    }
  }
};
THelloMessage.prototype = {};
THelloMessage.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.gender = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.helloMsg = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

THelloMessage.prototype.write = function(output) {
  output.writeStructBegin('THelloMessage');
  if (this.gender !== null && this.gender !== undefined) {
    output.writeFieldBegin('gender', Thrift.Type.I32, 1);
    output.writeI32(this.gender);
    output.writeFieldEnd();
  }
  if (this.helloMsg !== null && this.helloMsg !== undefined) {
    output.writeFieldBegin('helloMsg', Thrift.Type.I32, 2);
    output.writeI32(this.helloMsg);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TSayHelloResponse = module.exports.TSayHelloResponse = function(args) {
  this.success = null;
  this.error = null;
  this.data = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = new ttypes.Error(args.error);
    }
    if (args.data !== undefined && args.data !== null) {
      this.data = new ttypes.THelloMessage(args.data);
    }
  }
};
TSayHelloResponse.prototype = {};
TSayHelloResponse.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.BOOL) {
        this.success = input.readBool();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.error = new ttypes.Error();
        this.error.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRUCT) {
        this.data = new ttypes.THelloMessage();
        this.data.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TSayHelloResponse.prototype.write = function(output) {
  output.writeStructBegin('TSayHelloResponse');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.BOOL, 1);
    output.writeBool(this.success);
    output.writeFieldEnd();
  }
  if (this.error !== null && this.error !== undefined) {
    output.writeFieldBegin('error', Thrift.Type.STRUCT, 2);
    this.error.write(output);
    output.writeFieldEnd();
  }
  if (this.data !== null && this.data !== undefined) {
    output.writeFieldBegin('data', Thrift.Type.STRUCT, 3);
    this.data.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var TSayHelloRequest = module.exports.TSayHelloRequest = function(args) {
  this.name = null;
  if (args) {
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
  }
};
TSayHelloRequest.prototype = {};
TSayHelloRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TSayHelloRequest.prototype.write = function(output) {
  output.writeStructBegin('TSayHelloRequest');
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};
