const nodemailer = require('nodemailer');

const sendThankYouEmail = async (email, package) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  let info = await transporter.sendMail({
    from: '"Your Company" <your-email@gmail.com>',
    to: email,
    subject: "Thank You for Choosing Our Service",
    text: `Thank you for purchasing the ${package} package. We appreciate your support!`,
  });

  console.log('Message sent: %s', info.messageId);
};

module.exports = { sendThankYouEmail };
