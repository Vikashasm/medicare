var createError = require("http-errors");
const config = require("config");
const crypto = require("crypto");
const authService = require("../../service/user.service");
const httpStatus = require("http-status-codes").StatusCodes;

// find user by email
const findUserEmail = async (req, res, next) => {
  try {

    const condition= [
      {
        $match:{
          email: req.body.email
        }
      }
    ];
    const user = await authService.findUser(condition);
    if (user.length === 0) {
      next();
    } else {
      return res.status(404).json({
        success: false,
        isError: true,
        message: "email is already registered",
      });
    }
  } catch (err) {
    console.log(err);
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

//create a new user
const CreateUser = async (req, res, next) => {
  try {
    let user = req.body;
    const profileId = crypto.randomBytes(15).toString("hex")
    let data = {
      ...user,
      profileId:profileId
    };
    const newUser = await authService.createUser(data);
    if (newUser) {
      req.data={}
      req.data.newUser = newUser;
      next();
    } else {
      return res.status(500).json({
        success: false,
        isError: true,
        error: 'err.message',
      });
    }
  } catch (error) {
    console.log(error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const generateToken = async (req, res) => {
  try {
    const payload = {
      _id: req.data.newUser._id,
      id: req.data.newUser.id,
      email: req.data.newUser.email,
      username: req.data.newUser.username,
      isAdmin: req.data.newUser.isAdmin,
      profileId: req.data.newUser.profileId
    };
    const token = await authService.generateToken(payload);
    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'error',
      });
    } else {
      let createdUser = JSON.parse(JSON.stringify(req.data.newUser));
      createdUser.profileImagePath =await authService.userImage(createdUser.profileImage);
      delete createdUser.password;
      return res.status(200).json({
        success: true,
        message: "loged in successfully",
        "token": token,
        user: createdUser,
      });
    }
  } catch (error) {
    console.log(error)
    createError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = [
  findUserEmail,
  // generateHashPassword,
  CreateUser,
  generateToken,
];