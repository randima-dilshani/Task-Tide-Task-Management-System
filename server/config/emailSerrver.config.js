const nodemailer = require("nodemailer");

// Mail server configurations
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_PASSWORD,
  },
});

module.exports = { transporter };
