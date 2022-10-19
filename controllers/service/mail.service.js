const sgMail = require("@sendgrid/mail");
const config=require('config')

sgMail.setApiKey(
  config.sgMail
);


function  sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: "kumarijannat98765@gmail.com",
    subject: "reset password",
    templateId: "d-64a421f638f84747b7451af65dc183c7",
    dynamic_template_data: data.templateData.link,
    
  };

  sgMail.send(msg, (error, res) => {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log("mail is sent", res);
    }
  });
}
exports.sendEmail = sendEmail;