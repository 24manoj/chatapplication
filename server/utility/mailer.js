var mailer = require('nodemailer');

exports.sendMail = (reciver, data, callback) => {
    try {
        var transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'manoj.mk.24.mk@gmail.com',
                pass: '123manoj24$'
            }
        });
        console.log(data);
        var mailOptions = {
            from: 'manoj.mk.24.mk@gmail.com',
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