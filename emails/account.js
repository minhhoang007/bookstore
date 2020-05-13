const sgMail = require("@sendgrid/mail")

const sendGridAPIKey = process.env.sendGridAPIKey

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "hoangvanminh007@gmail.com",
        subject: "Thanks for joining in!",
        text: `Welcome to the app, ${name}. let me know how you get along with the app`
    })
}

const sendWarningLogin = (email, name) => {
    sgMail.send({
        to: email,
        from: "hoangvanminh007@gmail.com",
        subject: "Warning login email",
        text: `Hello, ${name}. Recentlly somebody try to login your account,
        and have be block cause entering wrong 3 time !Please let's us know that is your!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendWarningLogin
}