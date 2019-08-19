//importing module
var userModel = require('../app/model/userModel');
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
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
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
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

/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
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

/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
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
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
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
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.groupchat = (req, callback) => {
    try {
        userModel.groupchat(req, (err, data) => {
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
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
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
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
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
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.getGrpMsg = (req, callback) => {
    try {
        userModel.getGrpMsg(req, (err, data) => {
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
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.createGroup = (req, callback) => {
    try {

        userModel.createGroup(req, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end pass to model
 * @param req request contains all the requested data
 * @param callback sends the data back or err
 * @return responses with a http response
 */
exports.getGroups = (req, callback) => {
    try {

        userModel.getGroups(req, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}