let mongoose = require("mongoose");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const userModel = require("../../../models/user.model");
const authService = require("../../service/user.service");

//get user Detail

let UserDetail = async (req, res, next) => {
  try {
    if (req.params.userId==="me") {
      
      const condition=[
        {
        $match:{
          _id: mongoose.Types.ObjectId(req.params.userId)
        }
      }
    ]
      let user = await authService.findUser(condition);
      if (user.length > 0) {
        user[0].profileImagePath =await authService.userImage(user[0].profileImage);
        delete user[0].password;
        delete user[0].verificationToken;
        delete user[0].Duration;
        return res.status(200).json({
          success: true,
          message: "user details",
          user:user[0],
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "no user details found",
        });
      }
    } else {
      if (req.decoded.isAdmin === true) {
        const condition=[
          {
            $match:{
              _id: mongoose.Types.ObjectId(req.params.userId)
            }
          }
        ]
        let user = await authService.findUser(condition);
        if (user.length > 0) {
          user[0].profileImagePath =await authService.userImage(user[0].profileImage);
          delete user[0].password;
          delete user[0].verificationToken;
          delete user[0].Duration;
          return res.status(200).json({
            success: true,
            message: "user details",
            user:user[0],
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "no user details found",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "fail to authenticate admin",
        });
      }
    }
  } catch (error) {
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [UserDetail];
