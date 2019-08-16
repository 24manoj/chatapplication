//importing modules
const userService = require('../services/service');
const mail = require('../utility/mailer');
const jwt = require('../utility/generateToken');
/*  @desc validates request data,returns if errors are found,process to nextif no error
    @param req,res  takes request and response as parametrs 
    @return bool - success or failure *
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
/* @desc  filters the request data,validates error
    @param req,res  takes response and request as parameters 
    @return response - success or failure 
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
/* @desc  filters the request data,validates error,if everthig is correct send mail
    @param req,res  takes response and request as parameters 
    @return response - success or failure 
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
                        mail.sendMail(data[0].Email, process.env.url + "?token=" + token, (err, mail) => {
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
/* @desc  filters the request data,validates error,if everthig is correct send mail
    @param req,res  takes response and request as parameters 
    @return response - success or failure 
    */
exports.resetpassword = (req, res) => {
    try {
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
                res.status(422).send("Passwords mimatch" + err);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

exports.chat = (req, callback) => {
    try {

        userService.chat(req, (err, data) => {
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





/* @desc  filters the request data,validates error,if everthig is correct send mail
    @param req,res  takes response and request as parameters 
    @return response - success or failure 
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

exports.getMsg = (req, res) => {
    try {

        userService.getMsg(req, (err, data) => {
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