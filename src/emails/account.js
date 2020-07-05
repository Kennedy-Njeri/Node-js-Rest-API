const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const msg = {
    to: 'mistakenz@ymail.com',
    from: 'mistakenz@ymail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail.send(msg).then(() => {
    console.log("Message Sent")
}).catch((error) => {
    console.log(error.response.body)
})