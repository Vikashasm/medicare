var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const authService = require("../../service/user.service");

//find user by email
const findUser = async (req, res, next) => {
  try {
    const condition= [
      {
        $match:{
          phone: req.body.phone
        }
      }
    ];
    const user = await authService.findUser(condition);
    console.log(user)
    if (!user || user.length === 0) {
      return res.status(201).json({ success: true, message: "userDetail",user:{}});
    }
    else{
        const payload = {
            _id: user[0]._id,
            id: user[0].id,
            email: user[0].email,
            isAdmin: user[0].isAdmin,
            profileId:user[0].profileId
          };
          const token = await authService.generateToken(payload);
          user[0].profileImagePath =await authService.userImage(user[0].profileImage);
        return res.status(201).json({ success: true, message: "User Detail",user:user[0], token:token});
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = [findUser];