var assert = require('assert');
let chai = require('chai');
let chaiHttp = require("chai-http");
let server = require("../server/server");
let data = require('../test/data.json');
let should = chai.should();
require('dotenv').config();
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDU0MTJlNTEzNjJlMDczMzYxYjU3MmIiLCJpYXQiOjE1NjYzMDk4NDd9.AqqSWMtLdH8ZcIAbHnX7c5xLCU2Kt0atOZlgJK_jUKg"
chai.use(require('chai-json-schema'));
chai.use(chaiHttp);
describe("Testing  Registration api", () => {
    it("Testing for duplicate registration ", (done) => {
        chai.request(server)
            .post("/register", data)
            .send(data.data)
            .end((err, res) => {
                res.should.not.have.status(200);
                done()
                console.log("Api is not accepting duplicates")
            })

    })
    it("Testing for validation of data", (done) => {

        chai.request(server)
            .post('/register')
            .send(data.errdata)
            .end((err, res) => {
                res.should.not.have.status(200);
                done()
                res.body.error.forEach(element => {
                    console.log("data validation", element.msg);
                });
            })

    })
    it("Testing Not Acceptance null value", (done) => {
        chai.request(server)
            .post('/register')
            .send({})
            .end((err, res) => {
                res.should.not.have.status(200);
                done()
                res.body.error.forEach(element => {
                    console.log("data validation", element.msg);
                });
            })

    })
})
describe("Testing  login api", () => {
    it("Testing with right details", (done) => {
        chai.request(server)
            .post('/login')
            .send(data.login)
            .end((err, res) => {
                res.should.have.status(200);
                done()
                console.log("data validation sucess");
            });
    })
    it("Testing with wrong  details", (done) => {
        chai.request(server)
            .post('/login')
            .send(data.wronglogin)
            .end((err, res) => {
                res.should.have.status(404)
                done()
                console.log("data validation sucess", res.text);

            });
    })
    it("Testing invalid Email details", (done) => {
        chai.request(server)
            .post('/login')
            .send(data.wrongEmail)
            .end((err, res) => {
                res.should.have.status(422)
                done()
                console.log("data validation sucess");
                res.body.error.forEach(element => {
                    console.log("data validation", element.msg);
                    console.log("data validated Data", element.value);
                });
                console.log("Login ", res.body.sucess)

            });
    })
})


describe("Testing  ForgotPassword api", () => {
    it("Testing with right details", (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send(data.Email)
            .end((err, res) => {
                res.should.have.status(200);
                console.log("data validation sucess");
                done();
            });
    })
    it("Testing with wrong  details", (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send(data.Emailwrong)
            .end((err, res) => {
                res.should.have.status(422);
                console.log("data validation sucess");
                res.body.error.forEach(element => {
                    console.log("data validation", element.msg);
                    console.log("data validated Data", element.value);
                });
                console.log("Mail sending ", res.body.sucess)
                done()

            });
    })

})


describe("Testing  ResetPassword api", () => {
    it("Testing with right details", (done) => {
        console.log(data.passwords)
        chai.request(server)
            .post(`/resetpassword`)
            .query({ "token": token })
            .send(data.passwords)
            .end((err, res) => {
                res.should.have.status(200);
                console.log("data validation sucess", res.body);
                done();
            });
    })
    it("Testing with wrong  details", (done) => {
        chai.request(server)
            .post('/forgotPassword')
            .send(data.wrongEmail.Email)
            .end((err, res) => {
                res.should.have.status(422);
                console.log("data validation sucess");
                res.body.error.forEach(element => {
                    console.log("data validation", element.msg);
                    console.log("data validated Data", element.value);
                });
                console.log("Mail sending ", res.body.sucess)
                done()

            });
    })

})
describe("Testing  getusers api", () => {
    it("Testing with right details", (done) => {
        chai.request(server)
            .post('/getUsers')
            .end((err, res) => {
                res.should.have.status(200);
                console.log("data validation sucess", res.body);
                done();
            });
    })
})
describe("Testing  getMsg api", () => {
    it("Testing with right details", (done) => {
        chai.request(server)
            .post('/getMsg')
            .send(data.getMsg)
            .end((err, res) => {
                res.should.have.status(200);
                console.log("data validation sucess");
                done();
            });
    })
    it("Testing with wrong Email details", (done) => {

        chai.request(server)
            .post('/getMsg')
            .send(data.getMsgerror)
            .end((err, res) => {
                res.should.have.status(404);
                console.log("data validation sucess", res.text);
                done();
            });
    })
    it("Testing with empty details", (done) => {

        chai.request(server)
            .post('/getMsg')
            .send({})
            .end((err, res) => {
                res.should.have.status(422);
                console.log("data validation sucess", res.text);
                done();
            });
    })
})

describe("Testing  grpMsgs api", () => {
    it("Testing with wrong  details", (done) => {

        chai.request(server)
            .post('/getGrpMsg')
            .send(data.getGrpMsgerror)
            .end((err, res) => {
                res.should.have.status(404);
                console.log("data validation sucess", res.text);
                done();
            });
    })
    it("Testing with right details", (done) => {

        chai.request(server)
            .post('/getGrpMsg')
            .send(data.getGrpMsg)
            .end((err, res) => {
                res.should.have.status(200);
                console.log("data validation sucess");
                done();
            });
    })
    it("Testing with empty details", (done) => {

        chai.request(server)
            .post('/getGrpMsg')
            .send({})
            .end((err, res) => {
                res.should.have.status(422);
                console.log("data validation sucess", res.text);
                done();
            });
    })
})



