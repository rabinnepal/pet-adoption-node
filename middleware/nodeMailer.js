const nodemailer = require("nodemailer");

const sendEmail = async (options, job) => {
  const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    service: "gmail",
    auth: {
      user: "rabeen1008@gmail.com",
      pass: "vmlgpkfyjlqyajuv",
    },
  });
  //     var transporter = nodemailer.createTransport({
  //     service: "gmail",

  //     auth: {
  //       user: "sastobussewa@gmail.com",
  //       pass: "dsgeckwjmdaphpda",
  //     },
  //   });

  const mailOptions = {
    from: "Rabin Nepal <rabeen1008@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
