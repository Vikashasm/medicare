var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const contactModel = require("../../models/contact.model");
const config = require('config');

module.exports = {
  async findContact(data) {
    try {
      const contact = await contactModel.aggregate(data);
      return contact;
    } catch (error) {
      createError(500, error);
    }
  },

  createContact: async (contact) => {
    try {
      const newcontact = await contactModel.create(contact);
      return newcontact;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  updateContact: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await contactModel.findByIdAndUpdate(conditions, dataToUpdate,{new:true});
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  deleteContact: async (id) => {
    try {
      const deletedResult = await contactModel.deleteOne(id);
      return deletedResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  contactPic: function (url){
    try {
      if(!url || url===undefined){
        return config.fileUrl+'/contacts/profile.png'
      }
      else{
        return config.fileUrl+'/contacts/'+url
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}