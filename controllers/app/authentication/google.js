/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
const axios = require("axios");
const crypto = require("crypto");
const authConfig = require("./auth");

async function getGoogleUserInfo(req, res, next) {
  try {
    const { data } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${req.body.access_token}`,
      },
    });
    req.user = {
      googleId: data.id,
      email: data.email,
    };
    next();
  } catch (error) {
    console.log("here is error", error);
  }
}

const findUser = async (req, res, next) => {
  try {
    const userById = await authConfig.findByGoogleId(req.user.googleId);
    if (userById) {
      req.data = {};
      req.data.user = userById;
      next();
    } else {
      const user = await authConfig.findUser(req.user.email);
      req.data = {};
      if (user) {
        return res
          .status(500)
          .json({
            success: false,
            isError: true,
            message: "Email already exists",
          });
      } else {
        const user = await authConfig.findByGoogleId(req.user.googleId);
        if (user) {
          req.data.user = user;
          next();
        } else {
          const userToCreate = {
            ...req.user,
            username: req.body.username,
            dateOfBirth: req.body.dateOfBirth,
            skinCondition: req.body.skinCondition,
            profileImage: req.body.profileImage,
            country: req.body.country,
            gender: req.body.gender,
            phone: req.body.phone,
          };
          const googleUser = await authConfig.createUserFromGoogle(
            userToCreate
          );
          if (googleUser) {
            req.data.googleUser = googleUser;
            next();
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, isError: true, message: error.message });
  }
};

const generateToken = (req, res) => {
  try {
    let payload = {};
    if (req.data.user) {
      payload = {
        email: req.data.user.email,
        id: req.data.user.id,
        _id:req.data.user._id,
        isAdmin: req.data.user.isAdmin,
        tokenDuration: "90d",
      };
    } else {
      payload = {
        email: req.data.googleUser.google.email,
        id: req.data.googleUser.id,
        _id: req.data.googleUser._id,
        isAdmin: req.data.googleUser.isAdmin,
        tokenDuration: "90d",
      };
    }

    const token = authConfig.generateToken(payload);
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      user: req.data.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, isError: true, error });
  }
};

module.exports = [getGoogleUserInfo, findUser, generateToken];
