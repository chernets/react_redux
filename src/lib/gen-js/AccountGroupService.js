//
// Autogenerated by Thrift Compiler (0.11.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


//HELPER FUNCTIONS AND STRUCTURES

AccountGroupService_createOrUpdateAccountGroup_args = function(args) {
  this.token = null;
  this.accountGroup = null;
  if (args) {
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
    if (args.accountGroup !== undefined && args.accountGroup !== null) {
      this.accountGroup = new AccountGroup(args.accountGroup);
    }
  }
};
AccountGroupService_createOrUpdateAccountGroup_args.prototype = {};
AccountGroupService_createOrUpdateAccountGroup_args.prototype.read = function(input) {
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
        this.token = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.accountGroup = new AccountGroup();
        this.accountGroup.read(input);
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

AccountGroupService_createOrUpdateAccountGroup_args.prototype.write = function(output) {
  output.writeStructBegin('AccountGroupService_createOrUpdateAccountGroup_args');
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  if (this.accountGroup !== null && this.accountGroup !== undefined) {
    output.writeFieldBegin('accountGroup', Thrift.Type.STRUCT, 2);
    this.accountGroup.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountGroupService_createOrUpdateAccountGroup_result = function(args) {
  this.success = null;
  this.validError = null;
  this.error = null;
  if (args instanceof PreconditionException) {
    this.validError = args;
    return;
  }
  if (args instanceof ServerException) {
    this.error = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new AccountGroup(args.success);
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
AccountGroupService_createOrUpdateAccountGroup_result.prototype = {};
AccountGroupService_createOrUpdateAccountGroup_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new AccountGroup();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.validError = new PreconditionException();
        this.validError.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.error = new ServerException();
        this.error.read(input);
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

AccountGroupService_createOrUpdateAccountGroup_result.prototype.write = function(output) {
  output.writeStructBegin('AccountGroupService_createOrUpdateAccountGroup_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.validError !== null && this.validError !== undefined) {
    output.writeFieldBegin('validError', Thrift.Type.STRUCT, 1);
    this.validError.write(output);
    output.writeFieldEnd();
  }
  if (this.error !== null && this.error !== undefined) {
    output.writeFieldBegin('error', Thrift.Type.STRUCT, 2);
    this.error.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountGroupService_getAccountGroup_args = function(args) {
  this.token = null;
  this.accountGroupId = null;
  if (args) {
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
    if (args.accountGroupId !== undefined && args.accountGroupId !== null) {
      this.accountGroupId = args.accountGroupId;
    }
  }
};
AccountGroupService_getAccountGroup_args.prototype = {};
AccountGroupService_getAccountGroup_args.prototype.read = function(input) {
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
        this.token = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.accountGroupId = input.readString().value;
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

AccountGroupService_getAccountGroup_args.prototype.write = function(output) {
  output.writeStructBegin('AccountGroupService_getAccountGroup_args');
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  if (this.accountGroupId !== null && this.accountGroupId !== undefined) {
    output.writeFieldBegin('accountGroupId', Thrift.Type.STRING, 2);
    output.writeString(this.accountGroupId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountGroupService_getAccountGroup_result = function(args) {
  this.success = null;
  this.validError = null;
  this.error = null;
  if (args instanceof PreconditionException) {
    this.validError = args;
    return;
  }
  if (args instanceof ServerException) {
    this.error = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new AccountGroup(args.success);
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
AccountGroupService_getAccountGroup_result.prototype = {};
AccountGroupService_getAccountGroup_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new AccountGroup();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.validError = new PreconditionException();
        this.validError.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.error = new ServerException();
        this.error.read(input);
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

AccountGroupService_getAccountGroup_result.prototype.write = function(output) {
  output.writeStructBegin('AccountGroupService_getAccountGroup_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.validError !== null && this.validError !== undefined) {
    output.writeFieldBegin('validError', Thrift.Type.STRUCT, 1);
    this.validError.write(output);
    output.writeFieldEnd();
  }
  if (this.error !== null && this.error !== undefined) {
    output.writeFieldBegin('error', Thrift.Type.STRUCT, 2);
    this.error.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountGroupService_getAllAccountGroup_args = function(args) {
  this.token = null;
  this.filter = null;
  if (args) {
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
    if (args.filter !== undefined && args.filter !== null) {
      this.filter = new KazFilter(args.filter);
    }
  }
};
AccountGroupService_getAllAccountGroup_args.prototype = {};
AccountGroupService_getAllAccountGroup_args.prototype.read = function(input) {
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
        this.token = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.filter = new KazFilter();
        this.filter.read(input);
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

AccountGroupService_getAllAccountGroup_args.prototype.write = function(output) {
  output.writeStructBegin('AccountGroupService_getAllAccountGroup_args');
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  if (this.filter !== null && this.filter !== undefined) {
    output.writeFieldBegin('filter', Thrift.Type.STRUCT, 2);
    this.filter.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountGroupService_getAllAccountGroup_result = function(args) {
  this.success = null;
  this.validError = null;
  this.error = null;
  if (args instanceof PreconditionException) {
    this.validError = args;
    return;
  }
  if (args instanceof ServerException) {
    this.error = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [AccountGroup]);
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
AccountGroupService_getAllAccountGroup_result.prototype = {};
AccountGroupService_getAllAccountGroup_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size2378 = 0;
        var _rtmp32382;
        this.success = [];
        var _etype2381 = 0;
        _rtmp32382 = input.readListBegin();
        _etype2381 = _rtmp32382.etype;
        _size2378 = _rtmp32382.size;
        for (var _i2383 = 0; _i2383 < _size2378; ++_i2383)
        {
          var elem2384 = null;
          elem2384 = new AccountGroup();
          elem2384.read(input);
          this.success.push(elem2384);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.validError = new PreconditionException();
        this.validError.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.error = new ServerException();
        this.error.read(input);
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

AccountGroupService_getAllAccountGroup_result.prototype.write = function(output) {
  output.writeStructBegin('AccountGroupService_getAllAccountGroup_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter2385 in this.success)
    {
      if (this.success.hasOwnProperty(iter2385))
      {
        iter2385 = this.success[iter2385];
        iter2385.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.validError !== null && this.validError !== undefined) {
    output.writeFieldBegin('validError', Thrift.Type.STRUCT, 1);
    this.validError.write(output);
    output.writeFieldEnd();
  }
  if (this.error !== null && this.error !== undefined) {
    output.writeFieldBegin('error', Thrift.Type.STRUCT, 2);
    this.error.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AccountGroupServiceClient = function(input, output) {
    this.input = input;
    this.output = (!output) ? input : output;
    this.seqid = 0;
};
AccountGroupServiceClient.prototype = {};
AccountGroupServiceClient.prototype.createOrUpdateAccountGroup = function(token, accountGroup, callback) {
  if (callback === undefined) {
    this.send_createOrUpdateAccountGroup(token, accountGroup);
    return this.recv_createOrUpdateAccountGroup();
  } else {
    var postData = this.send_createOrUpdateAccountGroup(token, accountGroup, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_createOrUpdateAccountGroup);
  }
};

AccountGroupServiceClient.prototype.send_createOrUpdateAccountGroup = function(token, accountGroup, callback) {
  this.output.writeMessageBegin('createOrUpdateAccountGroup', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    accountGroup: accountGroup
  };
  var args = new AccountGroupService_createOrUpdateAccountGroup_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

AccountGroupServiceClient.prototype.recv_createOrUpdateAccountGroup = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new AccountGroupService_createOrUpdateAccountGroup_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.validError) {
    throw result.validError;
  }
  if (null !== result.error) {
    throw result.error;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'createOrUpdateAccountGroup failed: unknown result';
};
AccountGroupServiceClient.prototype.getAccountGroup = function(token, accountGroupId, callback) {
  if (callback === undefined) {
    this.send_getAccountGroup(token, accountGroupId);
    return this.recv_getAccountGroup();
  } else {
    var postData = this.send_getAccountGroup(token, accountGroupId, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getAccountGroup);
  }
};

AccountGroupServiceClient.prototype.send_getAccountGroup = function(token, accountGroupId, callback) {
  this.output.writeMessageBegin('getAccountGroup', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    accountGroupId: accountGroupId
  };
  var args = new AccountGroupService_getAccountGroup_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

AccountGroupServiceClient.prototype.recv_getAccountGroup = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new AccountGroupService_getAccountGroup_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.validError) {
    throw result.validError;
  }
  if (null !== result.error) {
    throw result.error;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'getAccountGroup failed: unknown result';
};
AccountGroupServiceClient.prototype.getAllAccountGroup = function(token, filter, callback) {
  if (callback === undefined) {
    this.send_getAllAccountGroup(token, filter);
    return this.recv_getAllAccountGroup();
  } else {
    var postData = this.send_getAllAccountGroup(token, filter, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getAllAccountGroup);
  }
};

AccountGroupServiceClient.prototype.send_getAllAccountGroup = function(token, filter, callback) {
  this.output.writeMessageBegin('getAllAccountGroup', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    filter: filter
  };
  var args = new AccountGroupService_getAllAccountGroup_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

AccountGroupServiceClient.prototype.recv_getAllAccountGroup = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new AccountGroupService_getAllAccountGroup_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.validError) {
    throw result.validError;
  }
  if (null !== result.error) {
    throw result.error;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'getAllAccountGroup failed: unknown result';
};
