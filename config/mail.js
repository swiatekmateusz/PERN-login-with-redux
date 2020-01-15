const nodemailer = require("nodemailer");
const config = require("config")

module.exports = transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.get('emailConfig.email'),
    pass: config.get('emailConfig.emailPassword'),
  }
})