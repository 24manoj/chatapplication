var mailer = require('nodemailer');

exports.sendMail = (reciver, data, callback) => {
    try {
        console.log(process.env.email)
        var transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.pass
            }
        });
        console.log("in mailgenerate", data);
        var mailOptions = {
            from: process.env.email,
            to: reciver,
            subject: 'Password Reset',
            text: data
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log("mail not sent", err);
                callback(err);
            }
            else {
                console.log("Mail sent");
                callback(null, data);
            }
        })

    } catch (e) {
        console.log(e);
    }
}