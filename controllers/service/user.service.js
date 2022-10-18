const bcrypt = require("bcryptjs");
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const userModel = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const config = require('config');
const saltRounds = 10;

module.exports = {
  async findUser(data) {
    try {
      const user = await userModel.aggregate(data);
      return user;
    } catch (error) {
      createError(500, error);
    }
  },

  createUser: async (user) => {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  updateUser: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await userModel.findByIdAndUpdate(conditions, dataToUpdate,{new:true});
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  deleteUser: async (id) => {
    try {
      const deletedResult = await userModel.deleteOne(id);
      return deletedResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  generateToken: async (payload) => {
    try {
      const token = await jwt.sign(payload, config.secret,{expiresIn: `${config.tokenDuration}`});
      return token;
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },
  userImage: function (url){
    try {
      if(!url || url===undefined){
        return config.fileUrl+'/users/profile.png'
      }
      else{
        return config.fileUrl+'/users/'+url
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
module.exports.hash = (password, callback) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      callback(error, hash);
    });
  });
};

module.exports.checkHashPassword = (password, hash, next) => {
  bcrypt.compare(password, hash, (err, res) => {
    next(err, res);
  });
};