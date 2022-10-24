const scheduleModel=require('../../models/schedule.model')
var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;

module.exports = {
  async findSchedule(data) {
    try {
      const schedule = await scheduleModel.aggregate(data);
      return schedule;
    } catch (error) {
      createError(500, error);
    }
  },

  createSchedule: async (product) => {
    try {
      const scheduleList = await scheduleModel.create(product);
      return scheduleList;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  editSchedule: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await scheduleModel.findByIdAndUpdate(conditions, dataToUpdate,{new:true});
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  deleteSchedule: async (id) => {
    try {
      const deletedResult = await scheduleModel.deleteOne(id);
      return deletedResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

}