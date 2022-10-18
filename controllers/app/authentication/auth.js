const jwt = require("jsonwebtoken");
const config = require("config");
const userModel = require("../../../models/user.model");

module.exports = {
  findByGoogleId: async (id) => {
    try {
      return userModel.findOne({ "google.id": id }).then((res) => res);
    } catch (error) {
      return error;
    }
  },

  async findUser(email) {
    try {
      return userModel.findOne({ $or: [{ email: email }, { "google.email": email }] }).then((res) => res);
    } catch (error) {
      return error;
    }
  },

  async attachGoogleToEmail(email, id) {
    try {
      return userModel.updateOne({ emaill: email }, { $set: { "google.email": email, "google.id": id } }).then((updateRes) => updateRes);
    } catch (error) {
      return error;
    }
  },
  createUserFromGoogle: async (data) => {
    try {
      const user = {
        "google.id": data.googleId,
        "google.email": data.email,
        method: "google",
      };
      return userModel.create(user).then((createdUser) => createdUser);
    } catch (error) {
      return error;
    }
  },
  
  logInWithGoogle: async (id) => {
    try {
      return userModel.findOne({ "google.id": id }).then((user) => user);
    } catch (error) {
      return error;
    }
  },
};
