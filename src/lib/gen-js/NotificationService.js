//
// Autogenerated by Thrift Compiler (0.11.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


//HELPER FUNCTIONS AND STRUCTURES

NotificationService_getAllNotifications_args = function(args) {
  this.token = null;
  this.unreadOnly = null;
  this.filter = null;
  if (args) {
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
    if (args.unreadOnly !== undefined && args.unreadOnly !== null) {
      this.unreadOnly = args.unreadOnly;
    }
    if (args.filter !== undefined && args.filter !== null) {
      this.filter = new KazFilter(args.filter);
    }
  }
};
NotificationService_getAllNotifications_args.prototype = {};
NotificationService_getAllNotifications_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.BOOL) {
        this.unreadOnly = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
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

NotificationService_getAllNotifications_args.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_getAllNotifications_args');
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  if (this.unreadOnly !== null && this.unreadOnly !== undefined) {
    output.writeFieldBegin('unreadOnly', Thrift.Type.BOOL, 2);
    output.writeBool(this.unreadOnly);
    output.writeFieldEnd();
  }
  if (this.filter !== null && this.filter !== undefined) {
    output.writeFieldBegin('filter', Thrift.Type.STRUCT, 3);
    this.filter.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

NotificationService_getAllNotifications_result = function(args) {
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
      this.success = Thrift.copyList(args.success, [NotificationQueue]);
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
NotificationService_getAllNotifications_result.prototype = {};
NotificationService_getAllNotifications_result.prototype.read = function(input) {
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
        var _size1816 = 0;
        var _rtmp31820;
        this.success = [];
        var _etype1819 = 0;
        _rtmp31820 = input.readListBegin();
        _etype1819 = _rtmp31820.etype;
        _size1816 = _rtmp31820.size;
        for (var _i1821 = 0; _i1821 < _size1816; ++_i1821)
        {
          var elem1822 = null;
          elem1822 = new NotificationQueue();
          elem1822.read(input);
          this.success.push(elem1822);
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

NotificationService_getAllNotifications_result.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_getAllNotifications_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter1823 in this.success)
    {
      if (this.success.hasOwnProperty(iter1823))
      {
        iter1823 = this.success[iter1823];
        iter1823.write(output);
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

NotificationService_markNotificationAsRead_args = function(args) {
  this.token = null;
  this.notificationId = null;
  if (args) {
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
    if (args.notificationId !== undefined && args.notificationId !== null) {
      this.notificationId = args.notificationId;
    }
  }
};
NotificationService_markNotificationAsRead_args.prototype = {};
NotificationService_markNotificationAsRead_args.prototype.read = function(input) {
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
        this.notificationId = input.readString().value;
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

NotificationService_markNotificationAsRead_args.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_markNotificationAsRead_args');
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  if (this.notificationId !== null && this.notificationId !== undefined) {
    output.writeFieldBegin('notificationId', Thrift.Type.STRING, 2);
    output.writeString(this.notificationId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

NotificationService_markNotificationAsRead_result = function(args) {
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
      this.success = args.success;
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
NotificationService_markNotificationAsRead_result.prototype = {};
NotificationService_markNotificationAsRead_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.BOOL) {
        this.success = input.readBool().value;
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

NotificationService_markNotificationAsRead_result.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_markNotificationAsRead_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.BOOL, 0);
    output.writeBool(this.success);
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

NotificationService_getAllNotificationTransportTypes_args = function(args) {
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
NotificationService_getAllNotificationTransportTypes_args.prototype = {};
NotificationService_getAllNotificationTransportTypes_args.prototype.read = function(input) {
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

NotificationService_getAllNotificationTransportTypes_args.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_getAllNotificationTransportTypes_args');
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

NotificationService_getAllNotificationTransportTypes_result = function(args) {
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
      this.success = Thrift.copyList(args.success, [NotificationTransportType]);
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
NotificationService_getAllNotificationTransportTypes_result.prototype = {};
NotificationService_getAllNotificationTransportTypes_result.prototype.read = function(input) {
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
        var _size1824 = 0;
        var _rtmp31828;
        this.success = [];
        var _etype1827 = 0;
        _rtmp31828 = input.readListBegin();
        _etype1827 = _rtmp31828.etype;
        _size1824 = _rtmp31828.size;
        for (var _i1829 = 0; _i1829 < _size1824; ++_i1829)
        {
          var elem1830 = null;
          elem1830 = new NotificationTransportType();
          elem1830.read(input);
          this.success.push(elem1830);
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

NotificationService_getAllNotificationTransportTypes_result.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_getAllNotificationTransportTypes_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter1831 in this.success)
    {
      if (this.success.hasOwnProperty(iter1831))
      {
        iter1831 = this.success[iter1831];
        iter1831.write(output);
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

NotificationService_getNotificationConfig_args = function(args) {
  this.token = null;
  this.userId = null;
  this.filter = null;
  if (args) {
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
    if (args.userId !== undefined && args.userId !== null) {
      this.userId = args.userId;
    }
    if (args.filter !== undefined && args.filter !== null) {
      this.filter = new KazFilter(args.filter);
    }
  }
};
NotificationService_getNotificationConfig_args.prototype = {};
NotificationService_getNotificationConfig_args.prototype.read = function(input) {
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
        this.userId = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
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

NotificationService_getNotificationConfig_args.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_getNotificationConfig_args');
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  if (this.userId !== null && this.userId !== undefined) {
    output.writeFieldBegin('userId', Thrift.Type.STRING, 2);
    output.writeString(this.userId);
    output.writeFieldEnd();
  }
  if (this.filter !== null && this.filter !== undefined) {
    output.writeFieldBegin('filter', Thrift.Type.STRUCT, 3);
    this.filter.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

NotificationService_getNotificationConfig_result = function(args) {
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
      this.success = Thrift.copyList(args.success, [NotificationConfig]);
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
NotificationService_getNotificationConfig_result.prototype = {};
NotificationService_getNotificationConfig_result.prototype.read = function(input) {
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
        var _size1832 = 0;
        var _rtmp31836;
        this.success = [];
        var _etype1835 = 0;
        _rtmp31836 = input.readListBegin();
        _etype1835 = _rtmp31836.etype;
        _size1832 = _rtmp31836.size;
        for (var _i1837 = 0; _i1837 < _size1832; ++_i1837)
        {
          var elem1838 = null;
          elem1838 = new NotificationConfig();
          elem1838.read(input);
          this.success.push(elem1838);
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

NotificationService_getNotificationConfig_result.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_getNotificationConfig_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter1839 in this.success)
    {
      if (this.success.hasOwnProperty(iter1839))
      {
        iter1839 = this.success[iter1839];
        iter1839.write(output);
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

NotificationService_updateNotificationConfig_args = function(args) {
  this.token = null;
  this.userId = null;
  this.notificationConfigs = null;
  if (args) {
    if (args.token !== undefined && args.token !== null) {
      this.token = args.token;
    }
    if (args.userId !== undefined && args.userId !== null) {
      this.userId = args.userId;
    }
    if (args.notificationConfigs !== undefined && args.notificationConfigs !== null) {
      this.notificationConfigs = Thrift.copyList(args.notificationConfigs, [NotificationConfig]);
    }
  }
};
NotificationService_updateNotificationConfig_args.prototype = {};
NotificationService_updateNotificationConfig_args.prototype.read = function(input) {
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
        this.userId = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size1840 = 0;
        var _rtmp31844;
        this.notificationConfigs = [];
        var _etype1843 = 0;
        _rtmp31844 = input.readListBegin();
        _etype1843 = _rtmp31844.etype;
        _size1840 = _rtmp31844.size;
        for (var _i1845 = 0; _i1845 < _size1840; ++_i1845)
        {
          var elem1846 = null;
          elem1846 = new NotificationConfig();
          elem1846.read(input);
          this.notificationConfigs.push(elem1846);
        }
        input.readListEnd();
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

NotificationService_updateNotificationConfig_args.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_updateNotificationConfig_args');
  if (this.token !== null && this.token !== undefined) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  if (this.userId !== null && this.userId !== undefined) {
    output.writeFieldBegin('userId', Thrift.Type.STRING, 2);
    output.writeString(this.userId);
    output.writeFieldEnd();
  }
  if (this.notificationConfigs !== null && this.notificationConfigs !== undefined) {
    output.writeFieldBegin('notificationConfigs', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.STRUCT, this.notificationConfigs.length);
    for (var iter1847 in this.notificationConfigs)
    {
      if (this.notificationConfigs.hasOwnProperty(iter1847))
      {
        iter1847 = this.notificationConfigs[iter1847];
        iter1847.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

NotificationService_updateNotificationConfig_result = function(args) {
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
      this.success = Thrift.copyList(args.success, [NotificationConfig]);
    }
    if (args.validError !== undefined && args.validError !== null) {
      this.validError = args.validError;
    }
    if (args.error !== undefined && args.error !== null) {
      this.error = args.error;
    }
  }
};
NotificationService_updateNotificationConfig_result.prototype = {};
NotificationService_updateNotificationConfig_result.prototype.read = function(input) {
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
        var _size1848 = 0;
        var _rtmp31852;
        this.success = [];
        var _etype1851 = 0;
        _rtmp31852 = input.readListBegin();
        _etype1851 = _rtmp31852.etype;
        _size1848 = _rtmp31852.size;
        for (var _i1853 = 0; _i1853 < _size1848; ++_i1853)
        {
          var elem1854 = null;
          elem1854 = new NotificationConfig();
          elem1854.read(input);
          this.success.push(elem1854);
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

NotificationService_updateNotificationConfig_result.prototype.write = function(output) {
  output.writeStructBegin('NotificationService_updateNotificationConfig_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter1855 in this.success)
    {
      if (this.success.hasOwnProperty(iter1855))
      {
        iter1855 = this.success[iter1855];
        iter1855.write(output);
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

NotificationServiceClient = function(input, output) {
    this.input = input;
    this.output = (!output) ? input : output;
    this.seqid = 0;
};
NotificationServiceClient.prototype = {};
NotificationServiceClient.prototype.getAllNotifications = function(token, unreadOnly, filter, callback) {
  if (callback === undefined) {
    this.send_getAllNotifications(token, unreadOnly, filter);
    return this.recv_getAllNotifications();
  } else {
    var postData = this.send_getAllNotifications(token, unreadOnly, filter, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getAllNotifications);
  }
};

NotificationServiceClient.prototype.send_getAllNotifications = function(token, unreadOnly, filter, callback) {
  this.output.writeMessageBegin('getAllNotifications', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    unreadOnly: unreadOnly,
    filter: filter
  };
  var args = new NotificationService_getAllNotifications_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

NotificationServiceClient.prototype.recv_getAllNotifications = function() {
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
  var result = new NotificationService_getAllNotifications_result();
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
  throw 'getAllNotifications failed: unknown result';
};
NotificationServiceClient.prototype.markNotificationAsRead = function(token, notificationId, callback) {
  if (callback === undefined) {
    this.send_markNotificationAsRead(token, notificationId);
    return this.recv_markNotificationAsRead();
  } else {
    var postData = this.send_markNotificationAsRead(token, notificationId, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_markNotificationAsRead);
  }
};

NotificationServiceClient.prototype.send_markNotificationAsRead = function(token, notificationId, callback) {
  this.output.writeMessageBegin('markNotificationAsRead', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    notificationId: notificationId
  };
  var args = new NotificationService_markNotificationAsRead_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

NotificationServiceClient.prototype.recv_markNotificationAsRead = function() {
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
  var result = new NotificationService_markNotificationAsRead_result();
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
  throw 'markNotificationAsRead failed: unknown result';
};
NotificationServiceClient.prototype.getAllNotificationTransportTypes = function(token, filter, callback) {
  if (callback === undefined) {
    this.send_getAllNotificationTransportTypes(token, filter);
    return this.recv_getAllNotificationTransportTypes();
  } else {
    var postData = this.send_getAllNotificationTransportTypes(token, filter, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getAllNotificationTransportTypes);
  }
};

NotificationServiceClient.prototype.send_getAllNotificationTransportTypes = function(token, filter, callback) {
  this.output.writeMessageBegin('getAllNotificationTransportTypes', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    filter: filter
  };
  var args = new NotificationService_getAllNotificationTransportTypes_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

NotificationServiceClient.prototype.recv_getAllNotificationTransportTypes = function() {
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
  var result = new NotificationService_getAllNotificationTransportTypes_result();
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
  throw 'getAllNotificationTransportTypes failed: unknown result';
};
NotificationServiceClient.prototype.getNotificationConfig = function(token, userId, filter, callback) {
  if (callback === undefined) {
    this.send_getNotificationConfig(token, userId, filter);
    return this.recv_getNotificationConfig();
  } else {
    var postData = this.send_getNotificationConfig(token, userId, filter, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getNotificationConfig);
  }
};

NotificationServiceClient.prototype.send_getNotificationConfig = function(token, userId, filter, callback) {
  this.output.writeMessageBegin('getNotificationConfig', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    userId: userId,
    filter: filter
  };
  var args = new NotificationService_getNotificationConfig_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

NotificationServiceClient.prototype.recv_getNotificationConfig = function() {
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
  var result = new NotificationService_getNotificationConfig_result();
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
  throw 'getNotificationConfig failed: unknown result';
};
NotificationServiceClient.prototype.updateNotificationConfig = function(token, userId, notificationConfigs, callback) {
  if (callback === undefined) {
    this.send_updateNotificationConfig(token, userId, notificationConfigs);
    return this.recv_updateNotificationConfig();
  } else {
    var postData = this.send_updateNotificationConfig(token, userId, notificationConfigs, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_updateNotificationConfig);
  }
};

NotificationServiceClient.prototype.send_updateNotificationConfig = function(token, userId, notificationConfigs, callback) {
  this.output.writeMessageBegin('updateNotificationConfig', Thrift.MessageType.CALL, this.seqid);
  var params = {
    token: token,
    userId: userId,
    notificationConfigs: notificationConfigs
  };
  var args = new NotificationService_updateNotificationConfig_args(params);
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

NotificationServiceClient.prototype.recv_updateNotificationConfig = function() {
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
  var result = new NotificationService_updateNotificationConfig_result();
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
  throw 'updateNotificationConfig failed: unknown result';
};
