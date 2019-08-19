//importing the modules
try {
    const express = require('express');
    const auth = require('../utility/generateToken');
    const controller = require('../controller/controller');
    //creating object of express router
    const router = express.Router();

    //routes to specified end points
    router.route('/register').post(controller.register);
    router.route('/login').post(controller.login);
    router.route('/forgotpassword').post(controller.forgotpassword);
    router.route('/resetpassword/:token').post(auth.verify, controller.resetpassword);
    router.route('/getUsers').post(controller.getUsers);
    router.route('/storeMsg').post(controller.chat);
    router.route('/getMsg').post(controller.getMsg);
    router.route('/createGroup').post(controller.createGroup);
    router.route('/getGrpMsg').post(controller.getGrpMsg)
    //making the router global
    module.exports = router;
} catch (e) {
    console.log(e);
}