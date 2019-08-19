//importing modules
const mangoose = require('mongoose');
const dcrypt = require('bcryptjs');
/*---------------------------------------------------------------*/
/*creating a schema of database*/
let chat = new mangoose.Schema({
    "from": {
        type: String,
        required: true
    },

    "to":
    {
        type: String,
        required: true,
    },
    "msg": {
        type: String,
        required: true
    },
},
    {
        timestamps: true

    });
/** Schema for group database */
let group = new mangoose.Schema({
    "creator": {
        type: String,
        required: true,
    },
    "groupName": {
        type: String,
        required: true
    },
    "membersEmail": [{
        type: String,
        required: true
    }],

}, {
        timestamps: true

    })

/** creating database for groupMsg */
let groupMsg = new mangoose.Schema({
    "from": {
        type: String,
        required: true,
    },
    "groupName": {
        type: String,
        required: true,

    },
    "membersEmail": [{
        type: String,
        required: true
    }],
    "msg":
    {
        type: String,
        required: true
    },
}, {
        timestamps: true

    });
/** creating schema for registration */
let registration = new mangoose.Schema({
    "firstName": {
        type: String,
        required: true
    },
    "LastName": {
        type: String,
        required: true
    },
    "Email": {
        type: String,
        required: true,
        unique: true
    },
    "Password": {
        type: String,
        required: true
    },
}, {
        timestamps: true
    });
var chatMsg = mangoose.model("chat", chat);
//creating a schema model for  registration
var userRegistration = mangoose.model("user", registration);
var groupCreate = mangoose.model("groups", group);
var getGroupMsgs = mangoose.model('groupMsgs', groupMsg);
/**
 * @desc Gets the input from front end and stores the registerd data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.chat = (req, callback) => {
    console.log(req.from);
    var details = new chatMsg({
        "from": req.from,
        "to": req.to,
        "msg": req.msg
    });
    //creates a collection
    details.save((err, data) => {
        if (err) {
            console.log("msg not saved");
            callback(err);
        } else {
            console.log("msg saved");
            callback(null, data);
        }
    });
}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.groupchat = (req, callback) => {
    console.log(req);
    var grpdetails = new getGroupMsgs({
        "from": req.from,
        "groupName": req.groupName,
        "membersEmail": req.membersEmail,
        "msg": req.msg
    });
    grpdetails.save((err, data) => {
        if (err) {
            console.log("Grpmsg not saved");
            callback(err);
        } else {
            console.log("Grp msg saved");
            callback(null, data);
        }
    });
}

/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.getGroups = (req, callback) => {
    console.log(req);
    groupCreate.find({
        $or: [{ "creator": req }, {

            "membersEmail": req
        }]
    }, (err, data) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null, data);
        }
    })
}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.Register = (req, callback) => {
    //findOne is buitin method of mongodb
    try {
        userRegistration.findOne({
            "Email": req.body.Email
        }, (err, data) => {
            if (data)
                callback("User Exist");
            else {
                //encrypts the password,default ly use hsmac 256
                dcrypt.hash(req.body.Password, 10, (err, encrypted) => {
                    var userDetails = new userRegistration({
                        "firstName": req.body.firstName,
                        "LastName": req.body.LastName,
                        "Email": req.body.Email,
                        "Password": encrypted,
                    });
                    //creates collection in database
                    userDetails.save((err, data) => {
                        if (err) {
                            console.log("Data not saved");
                            callback(err);
                        } else {
                            console.log("Data saved");
                            callback(null, data);
                        }
                    });
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.login = (req, callback) => {
    try {
        console.log("module check===>", req.body.Email)
        userRegistration.find({
            "Email": req.body.Email
        }, (err, data) => {

            if (data.length > 0 && data[0].Email == req.body.Email) {
                //compares password with encrypted password
                dcrypt.compare(req.body.Password, data[0].Password, (err, same) => {
                    console.log(same);
                    if (same == true) {
                        console.log("Sucess");
                        callback(null, data);
                    } else {
                        callback('password Did not matched {err}');
                    }
                })
            } else {
                callback('NO data found{err}');
            }
        });
    } catch (e) {
        console.log(e);
    }
}

/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.forgotpassword = (req, callback) => {
    try {
        userRegistration.find({
            "Email": req.body.Email
        }, (err, data) => {
            if (data.length > 0) {
                callback(null, data);
            } else {
                callback("Email Not found  " + err);
            }

        })
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.resetpassword = (data, callback) => {
    try {
        dcrypt.hash(data.userid.userId, 10, (err, encrypted) => {
            if (err) callback(err);
            else {
                userRegistration.updateOne({
                    "_id": data.userid.userId
                }, {
                        Password: encrypted
                    }, (err, data1) => {
                        if (err) {
                            callback(err);
                        } else {
                            console.log(" updated");
                            return callback(null, data1);
                        }
                    });
            }
        });
    } catch (e) {
        console.log(e);
    }
}

/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.createGroup = (req, callback) => {
    try {
        var groupDeatils = new groupCreate({
            "creator": req.body.creator,
            "groupName": req.body.groupName,
            "membersEmail": req.body.members,

        });
        groupDeatils.save((err, data) => {
            if (err) {
                console.log("Group Not created");
                callback(err);
            }
            else {
                console.log("Group msg inserted");
                callback(null, data);
            }
        })
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.getUsers = (callback) => {

    userRegistration.find((err, data) => {
        if (err) {
            callback(err);
        }
        else {
            //console.log(data);
            callback(null, data);
        }
    })

}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.getMsg = (req, callback) => {

    chatMsg.find({
        $or: [{
            "from": req.body.from,
            "to": req.body.to
        },
        {
            "from": req.body.to,
            "to": req.body.from
        }]
    }, (err, data) => {
        if (err) {
            callback(err);
        }
        else {
            console.log(data)
            callback(null, data);
        }
    })
}
/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.getGrpMsg = (req, callback) => {

    getGroupMsgs.find({
        $or: [{
            "from": req.body.from,
            "groupName": req.body.groupName

        },
        {
            "members": req.body.form,
            "groupName": req.body.groupName
        }]
    }, (err, data) => {
        if (err) {
            callback(err);
        }
        else {
            console.log(data)
            callback(null, data);
        }
    })

}