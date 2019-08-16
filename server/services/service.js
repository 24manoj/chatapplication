//importing module
var userModel = require('../app/model/userModel');
/* @desc serves requests to specified  models
    @param JSON  takes callback and request as parameters 
    @return bool - success or failure 
    */
exports.register = (req, callback) => {
    try {
        userModel.Register(req, (err, data) => {
            if (err) {
                callback(err);
            } else {

                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
/*  @desc serves requests to login  model
    @param JSON  takes callback and request as parameters 
    @return bool - success or failure 
    */
exports.login = (req, callback) => {
    try {
        userModel.login(req, (err, data) => {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });

    } catch (e) {
        console.log(e);
    }
}

/* @desc serves requests to forgopassword  model
    @param JSON  takes callback and request as parameters 
    @return bool - success or failure 
    */
exports.forgotpassword = (req, callback) => {
    try {
        userModel.forgotpassword(req, (err, data) => {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

/* @desc serves requests to resetPassword  model
    @param JSON  takes callback and request as parameters 
    @return bool - success or failure 
    */
exports.resetpassword = (data, callback) => {
    try {
        userModel.resetpassword(data, (err, data) => {

            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
exports.chat = (req, callback) => {
    try {
        userModel.chat(req, (err, data) => {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}


exports.getUsers = (callback) => {
    try {
        userModel.getUsers((err, data) => {
            if (err) {
                callback(err);
            } else {

                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
exports.getMsg = (req, callback) => {
    try {
        userModel.getMsg(req, (err, data) => {
            if (err) {
                callback(err);
            } else {

                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}