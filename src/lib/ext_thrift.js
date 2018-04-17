// 'use strict';
// angular.module('kazakhmysApp').factory('Document', ['$rootScope', function Document($rootScope) {

Document.prototype.getNumber = function () {
  if (this.numberDocument !== null) return this.numberDocument;
  return this.systemNumber;
};

Document.prototype.getAuthor = function () {
  return this.creator
};

Document.prototype.getResponsible = function () {
  return _.filter(this.otherUsers, {
    ownerType: DocumentExecutionOwnerType.RESPONSIBLE
  });
};

Document.prototype.getSpectator = function () {
  return _.filter(this.otherUsers, {
    ownerType: DocumentExecutionOwnerType.SPECTATOR
  });
};

Document.prototype.getExecutorUnic = function () {
  return _.uniqBy(_.filter(this.currentExecutors, {
    ownerType: DocumentExecutionOwnerType.EXECUTOR
  }), 'userOGroup.userOrGroupId');
};

Document.prototype.getAdditionalConfirmedUnic = function () {
  return _.uniqBy(_.filter(this.currentExecutors, {
    ownerType: DocumentExecutionOwnerType.ADDITIONAL_CONFIRMER
  }), 'userOGroup.userOrGroupId');
};

Document.prototype.getExecutorAndAdditionalConfirmedUnic = function () {
  return _.uniqBy(_.concat(this.getExecutorUnic(), this.getAdditionalConfirmedUnic()));
};

Document.prototype.getExecutorUnicOpen = function () {
  return _.uniqBy(_.filter(this.currentExecutors, {
    status: DocumentExecutionStatus.OPEN,
    ownerType: DocumentExecutionOwnerType.EXECUTOR
  }), 'userOGroup.userOrGroupId');
};

Document.prototype.getAdditionalConfirmedUnicOpen = function () {
  return _.uniqBy(_.filter(this.currentExecutors, {
    status: DocumentExecutionStatus.OPEN,
    ownerType: DocumentExecutionOwnerType.ADDITIONAL_CONFIRMER
  }), 'userOGroup.userOrGroupId');
};

Document.prototype.getExecutorAndAdditionalConfirmedUnicOpen = function () {
  return _.uniqBy(_.concat(this.getExecutorUnicOpen(), this.getAdditionalConfirmedUnicOpen()), 'userOGroup.userOrGroupId');
};

Document.prototype.getSubscriber = function () {
  var arr = _.filter(this.documentParticipantGroup, { dispatchState: DispatchState["OUTBOX"] });
  if (arr.length > 0) {
    return _.head(_.head(arr).userOrGroup).getFio();
  }
  return null;
}

UserOrGroup.prototype.getFio = function () {
  var fio = '';
  if (this.userLastName !== null && this.userLastName !== "" && this.userLastName !== undefined) {
    fio = this.userLastName;
    fio = fio.charAt(0).toUpperCase() + fio.substr(1).toLowerCase();
  }
  if (this.userFirstName !== null && this.userFirstName !== "" && this.userFirstName !== undefined) {
    fio = fio + " " + this.userFirstName.substr(0, 1).toUpperCase() + ".";
  }
  if (this.userMiddleName !== null && this.userMiddleName !== "" && this.userMiddleName !== undefined) {
    fio = fio + " " + this.userMiddleName.substr(0, 1).toUpperCase() + ".";
  }
  if (this.type === UserOrGroupType.GROUP && this.nameGroup !== null && this.nameGroup !== "" && this.nameGroup !== undefined) {
    fio = this.nameGroup;
  }
  return fio;
}

UserOrGroup.prototype.getFioFull = function () {
  var fio = '';
  if (this.userLastName !== null && this.userLastName !== "" && this.userLastName !== undefined) {
    fio = _.trim(this.userLastName);
    fio = fio.charAt(0).toUpperCase() + fio.substr(1).toLowerCase();
  }
  if (this.userFirstName !== null && this.userFirstName !== "" && this.userFirstName !== undefined) {
    fio = fio + " " + _.trim(this.userFirstName.charAt(0)).toUpperCase() + _.trim(this.userFirstName).substr(1).toLowerCase();
  }
  if (this.userMiddleName !== null && this.userMiddleName !== "" && this.userMiddleName !== undefined) {
    fio = fio + " " + _.trim(this.userMiddleName.charAt(0)).toUpperCase() + _.trim(this.userMiddleName).substr(1).toLowerCase();
  }
  if (this.type === UserOrGroupType.GROUP && this.nameGroup !== null && this.nameGroup !== "" && this.nameGroup !== undefined) {
    fio = this.nameGroup;
  }
  return fio;
}
//return Document;
//}])
almVoteUser = function (args) {
  this.id = null;
  this.firstName = null;
  this.lastName = null;
  this.middleName = null;
  this.avatarUrl = null;
  this.position = null;
  if (args) {
    this.id = args.id || null;
    this.firstName = args.firstName || null;
    this.lastName = args.lastName || null;
    this.middleName = args.middleName || null;
    this.avatarUrl = args.avatarUrl || null;
    this.position = args.position || null;
  }
}
almVoteUser.prototype = almVoteUser;

almVoteUser.prototype.getFio = function () {
  var fio = ''
  if (this.lastName !== null && this.lastName !== "" && this.lastName !== undefined) {
    fio = fio + " " + this.lastName.charAt(0).toUpperCase() + this.lastName.substr(1).toLowerCase();
  }
  if (this.firstName !== null && this.firstName !== "" && this.firstName !== undefined) {
    fio = fio + " " + this.firstName.charAt(0).toUpperCase() + this.firstName.substr(1).toLowerCase();
  }
  if (this.userMiddleName !== null && this.userMiddleName !== "" && this.userMiddleName !== undefined) {
    fio = fio + " " + this.userMiddleName.charAt(0).toUpperCase() + this.userMiddleName.substr(1).toLowerCase();
  }
  return fio
}

UserOrGroup.prototype.getAvatar = function () {
  //return "/assets/img/icons/per_def_icon.svg"
  return this.avatarUrl === null ? (this.type === UserOrGroupType.GROUP ? "/assets/img/icons/group_def_icon.svg" : "/assets/img/icons/per_def_icon.svg") : window.avatarUrl + 'avatar?id=' + this.avatarUrl + '&size=180'
}

almVoteUser.prototype.getAvatar = function () {
  return this.avatarUrl === null ? "/assets/images/icons/per_def_icon.svg" : window.server.url + window.server.avatar + 'avatar?id=' + this.avatarUrl + '&size=180'
}

almVoteUser.prototype.getDesc = function (args) {
  return this.position
}

almVoteGroup = function (args) {
  this.id = null;
  this.nameGroup = null;
  this.description = null;
  this.avatarUrl = null;
  if (args) {
    this.id = args.id || null;
    this.nameGroup = args.nameGroup || null;
    this.description = args.description || null;
    this.avatarUrl = args.avatarUrl || null;
  }
}
almVoteGroup.prototype = almVoteGroup;
almVoteGroup.prototype.getFio = function () {
  var fio = ''
  if (this.nameGroup !== null && this.nameGroup !== "" && this.nameGroup !== undefined) {
    fio = fio + " " + _.trim(this.nameGroup.charAt(0)).toUpperCase() + _.trim(this.nameGroup).substr(1).toLowerCase();
  }
  return fio
}

almVoteGroup.prototype.getDesc = function (args) {
  return this.description
}

almVoteGroup.prototype.getAvatar = function () {
  return this.avatarUrl === null ? "/assets/images/icons/group_def_icon.svg" : window.server.url + window.server.avatar + 'avatar?id=' + this.avatarUrl + '&size=180'
}

almVoteParticipant = function (args) {
  this.user = null;
  this.group = null;
  this.type = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = new almVoteUser(args.user)
    }
    if (args.group !== undefined && args.group !== null) {
      this.group = new almVoteGroup(args.group)
    }
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type
    }
  }
}
almVoteParticipant.prototype = almVoteParticipant;

almVoteParticipant.prototype.getId = function (args) {
  if (this.user !== null) return this.user.id
  if (this.group !== null) return this.group.id
}

almVoteParticipant.prototype.getFio = function (args) {
  if (this.user !== null) return this.user.getFio()
  if (this.group !== null) return this.group.getFio()
}

almVoteParticipant.prototype.getDesc = function (args) {
  if (this.user !== null) return this.user.getDesc()
  if (this.group !== null) return this.group.getDesc()
}

almVoteParticipant.prototype.getAvatar = function (args) {
  if (this.user !== null) return this.user.getAvatar()
  if (this.group !== null) return this.group.getAvatar()
}

almVoteAnswer = function (args) {
  this.id = null;
  this.answerText = null;
  this.deleteDate = null;
  this.ignore = null;
  this.priority = null;
  if (args) {
    this.id = args.id || null;
    this.answerText = args.answerText || null;
    this.deleteDate = args.deleteDate || -1;
    if (args.ignore !== undefined && args.ignore !== null) {
      this.ignore = args.ignore
    }
    this.priority = args.priority || 0;
  }
}
almVoteAnswer.prototype = almVoteAnswer;

almVoteAnswerUser = function (args) {
  this.answerDate = null;
  this.answer = null;
  this.user = null;
  if (args) {
    //this.answer = args.answer || null
    if (args.answer !== undefined && args.answer !== null) {
      this.answer = new almVoteAnswer(args.answer)
    }

    this.answerDate = args.answerDate || -1
    if (args.user !== undefined && args.user !== null) {
      this.user = new almVoteUser(args.user)
    }
  }
}
almVoteAnswer.prototype = almVoteAnswerUser;
almVote = function (args) {
  this.id = null
  this.createDate = null
  this.deleteDate = null
  this.title = null
  this.description = null
  this.author = null
  this.startDate = null
  this.endDate = null
  this.quota = null
  this.closeDate = null
  this.closeAnswer = null
  this.closeAnswerId = null
  this.answers = null
  this.participants = null
  this.answerUserList = null
  this.canVote = null
  this.anonymous = null
  this.answerMap = null
  this.paused = false
  this.participantsCount = null
  if (args) {
    this.id = args.id || null
    this.createDate = args.createDate || null
    this.deleteDate = args.deleteDate || null
    this.closeAnswerId = args.closeAnswerId || null
    this.title = args.title || null
    this.description = args.description || null
    if (args.author !== undefined && args.author !== null) {
      this.author = new almVoteUser(args.author)
    }
    this.startDate = args.startDate || null
    this.endDate = args.endDate || null
    this.quota = args.quota || null
    this.closeDate = args.closeDate || null
    this.closeAnswer = args.closeAnswer || null
    this.participantsCount = args.participantsCount || 0
    if (args.paused !== undefined && args.paused !== null) {
      this.paused = args.paused
    }
    if (args.answers !== undefined && args.answers !== null) {
      this.answers = args.answers.map(function (item) {
        return new almVoteAnswer(item)
      })
    }
    if (args.participants !== undefined && args.participants !== null) {
      this.participants = args.participants.map(function (item) {
        return new almVoteParticipant(item)
      })
    }
    if (args.answerUserList !== undefined && args.answerUserList !== null) {
      this.answerUserList = args.answerUserList.map(function (item) {
        return new almVoteAnswerUser(item)
      })
    }
    if (args.anonymous !== undefined && args.anonymous !== null) {
      this.anonymous = args.anonymous
    }
    if (args.canVote !== undefined && args.canVote !== null) {
      this.canVote = args.canVote
    }
    if (args.answerMap !== undefined && args.answerMap !== null) {
      this.answerMap = args.answerMap
    }
  }
}
almVote.prototype = almVote;