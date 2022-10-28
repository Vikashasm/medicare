var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const routineModel = require("../../models/routuneLog.model");
let oneDay = 24 * 60 * 60 * 1000;

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

  editRoutine: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await routineModel.findByIdAndUpdate(conditions, dataToUpdate,{new:true});
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  deleteRoutine: async (id) => {
    try {
      const deletedResult = await routineModel.deleteOne(id);
      return deletedResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },


  async listAccToDate(setdate, range1, range2) {
    const data = new Date();
    const currentMonth = data.getDate();
    //for 1 week
    if (setdate == 'week') {
      // console.log(new Date(Date.now()).getHours()*60 * 60 * 1000-1)
      // console.log(new Date(Date.now()-(new Date(Date.now()).getHours()*60 * 60 * 1000-1)).getHours())
      let start = new Date(Date.now() - 7 * oneDay);
      return {start:new Date(start.getTime()-(new Date(Date.now()).getHours()*60 * 60 * 1000-1)),end:new Date(Date.now()),currentStartTime:new Date(start.getTime()-(new Date(Date.now()).getHours()*60 * 60 * 1000-1)),currentEndTime : new Date(Date.now())};
    }

    //for 1 month
    else if (setdate == 'month') {
      let start = new Date(Date.now() - currentMonth * oneDay + oneDay);
      let end=new Date(Date.now())
      return {start:start,end:end,currentStartTime:start,currentEndTime:end};
    }
  },

  async getDatesInRange(startDate, endDate) {
    const date = new Date(startDate);
    const dates = [];
    while (date <= endDate) {
      dates.push({ createdAt: new Date(date), count: 0 });
      date.setDate(date.getDate() + 1);
    }
    return dates;
  },

}