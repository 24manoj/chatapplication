//importing modules
const userService = require('../services/service');
const mail = require('../utility/mailer');
const jwt = require('../utility/generateToken');
require('dotenv').config()
/**
 * @desc Gets the input from front end filters and performs validation  
 * @param req request contains all the requested data
 * @param response sends the data or err  
 * @return responses with a http response
 */
exports.register = (req, res) => {
    //event emiters
    try {
        req.checkBody('firstName', 'First name is not valid ').isLength({
            min: 3,
            max: 8
        });
        req.checkBody('LastName', 'Last name is not valid ').isAlpha();
        req.checkBody('Email', 'Email is not valid ').isEmail();
        req.checkBody('Password', 'Password is not valid').not().isEmpty().isLength({
            min: 8
        });
        //catches the events if emited
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.sucess = false;
            //sends response if error found
            res.status(422).send(response);
        } else {
            //invokes services register
            userService.register(req, (err, data) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.status(200).send(data);
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.login = (req, res) => {
    try {
        req.checkBody("Email", "Email is not valid").isEmail();
        req.checkBody("Password", "Password is invald").isLength({
            min: 8
        });
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.sucess = false;
            res.status(422).send(response);
        } else {
            userService.login(req, (err, data) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.status(200).send(data);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.forgotpassword = (req, res) => {
    try {
        req.checkBody("Email", "Email is not valid").isEmail();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.sucess = false;
            res.status(422).send(response);
        } else {
            userService.forgotpassword(req, (err, data) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    //generates token
                    jwt.generate(data[0].id, (err, token) => {
                        // mail.sendMail(data[0].Email, process.env.url + "?token=" + token, (err, mail) => {
                        //console.log('from controller', process.env.url);
                        var url = process.env.url + "#!/resetpassword" + "?token=" + token;
                        mail.sendMail(data[0].Email, url, (err, mail) => {
                            if (mail) {
                                console.log("mail sent");
                                res.status(200).send(mail);
                            } else {
                                res.status(422).send(err);
                            }
                        })

                    });
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.resetpassword = (req, res) => {
    try {
        req.checkBody("Password", "password is not valid").isLength({ min: 8 });
        req.checkBody("confirmPassword", "confirmPassword is not valid").isLength({ min: 8 });
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.sucess = false;
            res.status(422).send(response);
        } else {
            if (req.body.Password !== null && req.body.confirmPassword !== null) {
                if (req.body.Password == req.body.confirmPassword) {
                    let resetData = {
                        userid: req.decoded,
                        Password: req.body.Password,
                        confirmPassword: req.body.confirmPassword
                    }
                    userService.resetpassword(resetData, (err, data) => {
                        if (err) {
                            res.status(404).send(err);
                        } else {
                            res.status(200).send(data);
                        }

                    })
                } else {
                    res.status(422).send("Passwords mismatch", err);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param callback sends the data or err
 * @return responses with a http response
 */
exports.chat = (req, callback) => {
    try {
        req.checkBody("from", "sender Email is not valid").isEmail()
        req.checkBody("msg", "msg  not valid").not.isEmpty()
        req.checkBody("to", " reciver Email not valid").isEmail()
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.sucess = false;
            res.status(422).send(response);
        } else {
            userService.chat(req, (err, data) => {
                if (err) {
                    callback(err);
                    //res.status(404).send(err);
                } else {
                    callback(null, data);
                    //res.status(200).send(data);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param callback sends the data or err
 * @return responses with a http response
 */
exports.groupchat = (req, callback) => {
    try {

        userService.groupchat(req, (err, data) => {
            if (err) {
                callback(err);
                // res.status(404).send(err);
            } else {
                callback(null, data);
                // res.status(200).send(data);
            }

        })


    } catch (e) {
        console.log(e);
    }
}



/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.getUsers = (req, res) => {
    try {
        userService.getUsers((err, data) => {
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(200).send(data);
            }

        })

    } catch (e) {
        console.log(e);
    }
}
/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.getMsg = (req, res) => {
    try {
        req.checkBody("from", "sender Email is not valid").isEmail()
        req.checkBody("to", " reciver Email not valid").isEmail()
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.sucess = false;
            res.status(422).send(response);
        } else {
            userService.getMsg(req, (err, data) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.status(200).send(data);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.getGrpMsg = (req, res) => {
    try {
        req.checkBody("from", "sender Email is not valid").isEmail()
        req.checkBody("groupName", " GroupName   not valid").isAlpha()
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.error = errors;
            response.sucess = false;
            res.status(422).send(response);
        } else {
            userService.getGrpMsg(req, (err, data) => {
                if (err) {
                    res.status(404).send(err);
                } else {
                    res.status(200).send(data);
                }

            })
        }
    } catch (e) {
        console.log(e);
    }
}


/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.createGroup = (req, res) => {
    try {
        userService.createGroup(req, (err, data) => {
            if (err) {
                res.status(404).send(err);
            }
            else {
                res.status(200).send(data);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

/**
 * @desc Gets the input from front end filters and performs validation
 * @param req request contains all the requested data
 * @param response sends the data or err
 * @return responses with a http response
 */
exports.getGroups = (req, callback) => {
    try {

        userService.getGroups(req, (err, data) => {
            if (err) {
                callback(err);
                // res.status(404).send(err);
            } else {
                callback(null, data);
                // res.status(200).send(data);
            }

        })

    } catch (e) {
        console.log(e);
    }
}
