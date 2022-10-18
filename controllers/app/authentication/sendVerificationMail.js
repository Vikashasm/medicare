const crypto = require("crypto");
const { sendEmail } = require("../../service/mail.service");
const authService = require("../../service/user.service");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

const sendEmailToUser = async (req, res) => {
  try {
    const verificationToken = crypto.randomInt(100000,999999)
    const link = `${verificationToken}`;
    const data = {
      receiver: req.body.email,
      templateData: {
        link,
        subject: "reset password",
      },
    };
    await sendEmail(data);
    const condition=[
      {
        $match:{
          email:req.body.email
        }
      }
    ]
    let user=await authService.findUser(condition)
    console.log(user)
    if(user.length>0){
      const payload = {
        _id: user[0]._id,
        id: user[0].id,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        profileId:user[0].profileId
      };
      const token = await authService.generateToken(payload);
      await Promise.all(user.map(async post=>{
        post.profileImagePath =await authService.userImage(user.profileImage);
      }));
      
      return res.status(200).json({ success: true, message: "mail sent!" , otp: verificationToken ,user:user[0],"token":token});
    }
    return res.status(200).json({ success: true, message: "mail sent!" , otp: verificationToken ,user:{}});
  } catch (error) {
    console.log(error);
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [sendEmailToUser];