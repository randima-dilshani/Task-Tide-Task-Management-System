//Error messages
const { transporter } = require("../config/emailSerrver.config");
const BadRequestError = require("../error/error.classes/BadRequestError");
const NotFoundError = require("../error/error.classes/NotFoundError");

const sendEmail = async (email, subject, htmlBody, attachment) => {
  if (!email) throw new NotFoundError("Email is required!");
  if (!subject) throw new NotFoundError("Subject is required!");
  if (!htmlBody) throw new NotFoundError("HTML body is required!");

  let mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: subject,
    html: htmlBody,
  };

  if (attachment) {
    mailOptions.attachments = [
      {
        filename: attachment.originalname,
        content: attachment.buffer,
        contentType: attachment.mimetype,
      },
    ];
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
};

module.exports = { sendEmail };
