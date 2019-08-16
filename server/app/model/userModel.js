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
        required: true
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


/**
 * @desc Gets the input from front end and stores the registerd data in deatabase
 * @param Json takes two arguments request contains all the requested data,and a callback function
 * @return bool - return a call back function err or data
 */
exports.chat = (req, callback) => {
    console.log(req.from);
    var details = new chatMsg({
        "from": req.from,
        "to": req.to,
        "msg": req.msg
    });
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
 * @desc Gets the input from front end and stores the registerd data in deatabase
 * @param Json takes two arguments request contains all the requested data,and a callback function
 * @return bool - return a call back function err or data
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
 * @desc Gets the input email and password ,checkes for data avalibality in mongodb
 * @param Json Takes two parameter request and a callback
 * @return bool - return a callback function err or data
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
 * @desc Gets the input email and password ,checkes for data avalibality in mongodb
 * @param  req callback Takes two parameter request and a callback
 * @return bool - return a callback function err or data
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
/* @desc takes changed password from the user and saves to database
    @param  takes a request data and a callback function as argumensts
    @return bool - success or failure 
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