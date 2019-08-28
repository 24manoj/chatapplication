/********************************************************************************************************************
 * @Execution : default nodemon : cmd> server.js
 * @Purpose : learn backend using node
 * @description : Using express frame work and socketio build a realtime cpplication
 * @overview : chat application 
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since : 9-aug-2019
 *
 *******************************************************************************************************************/
//importing express framework 

const express = require("express");
const cors = require('cors');
const controller = require('../server/controller/controller')
//importing mongoose (mongodb)
const mongoose = require('mongoose')
//importing express-validator for validation of errors
const expressValidator = require('express-validator');
//importing body-parser to parse json objects
var bodyParser = require("body-parser");
//importing routes function 
const routes = require('./routes/routes');
require('dotenv').config()
// console.log("In server process dtnv", res)
//console.log("in server.js", process.env.url);
//careating an instance of the framework
const app = express();
/*for every middleware layer that you want to add (it can be generic to all paths or 
triggered only on specific path(s) your server handles), 
and it will add onto your Express middleware stack*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());


app.use(express.static('../client'))
app.use(expressValidator());
app.use('/', routes);

//Establishing the connection with database
var db = mongoose.connect("mongodb://localhost:27017/chatapp1", {
    useNewUrlParser: true
});
//Event Emiters
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to the database");
})
mongoose.connection.on("disconnected", () => {
    console.log('Could not connect to the database ');
    process.exit();
})
mongoose.connection.on("error", () => {
    console.log('error while connecting to the database ');
    process.exit(1);
})
//Initalizing the app port number,Telling frame work to start service
var server = app.listen(3000, () => {
    console.log("Running RestHub on port " + 3000);
});
//socket io instation 
var io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    console.log("socket Connected");
    /**
     catches the emited event from client side
     */
    socket.on("getGrops", (data) => {
        console.log("Emit catched in getGroups");
        controller.getGroups(data, (err, res) => {
            if (err) {
                console.log("Empty Groups");
            }
            else {
                //creating event
                io.sockets.emit("updateGrops", res);
            }
        })
    });
    /**
      catches the emited event from client side
      */
    socket.on("storeGrpMsg", (data) => {
        console.log("Emit catched in getGroupsmsgs", data);
        controller.groupchat(data, (err, res) => {
            if (err) {
                console.log("not inserted Groups");
            }
            else {
                io.sockets.emit("updateGropsMsgs", res);
            }
        })
    });
    /**
    catches the emited event from client side
    */
    socket.on('message', (data) => {
        console.log("Emit catched", data)
        controller.chat(data, (err, res) => {
            if (err) {
                console.log("un sucessfull insertion");
            }
            else {
                console.log("in server server.js==>", res);
                io.sockets.emit('updateList', res);
            }
        })
    });
});
io.on('disconnect', function () {
    console.log("socket disconnected!! ");
});
module.exports = app;

