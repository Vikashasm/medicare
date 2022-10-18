var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const routineModel = require("../../models/routuneLog.model");
module.exports = {
  async findRoutine(data) {
    try {
      const routine = await routineModel.aggregate(data);
      return routine;
    } catch (error) {
      createError(500, error);
    }
  },

  createRoutine: async (product) => {
    try {
      const routineList = await routineModel.create(product);
      return routineList;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },
}