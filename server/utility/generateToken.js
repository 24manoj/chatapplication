var jwt = require('jsonwebtoken');
/*
jwt.sign(payload, secretOrPrivateKey, [options, callback])
(Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
(Synchronous) Returns the JsonWebToken as string
payload could be an object literal, buffer or string representing valid JSON.
*/

/*
algorithm (default: HS256)
expiresIn: expressed in seconds or a string describing a time span zeit/ms.
*/

exports.generate = (id, callback) => {
    try {
        var payload = { userId: id };

        jwt.sign(payload, process.env.secretKey, (err, token) => {
            if (err)
                callback(err);
            else
                callback(null, token);
        });
    } catch (e) {
        console.log(e);
    }
}


exports.verify = (req, res, next) => {
    try {
        var token = req.params.token;

        jwt.verify(token, process.env.secretKey, (err, payload) => {
            if (err) {

                res.status(422).send(err);
            }
            else {
                req.decoded = payload;
                next();

            }

        })
    } catch (e) {
        console.log(e);
    }
}
