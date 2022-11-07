var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const videoModel = require("../../models/video.model");
const imageMiddleware=require('../../middleware/image.middleware')
module.exports = {
  async findVideo(data) {
    try {
      const video = await videoModel.aggregate(data);
      return video;
    } catch (error) {
      createError(500, error);
    }
  },

  updateVideo: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await videoModel.findByIdAndUpdate(conditions, dataToUpdate,{new:true});
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  addVideo: async (video) => {
    try {
      const newUser = await videoModel.create(video);
      return newUser;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  videoPic: function (url){
    try {
      if(!url || url===undefined){
        return imageMiddleware.getFiles('video/1.png')
      }
      else{
        return imageMiddleware.getFiles(`video/${url}`)
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}