var createError = require("http-errors");
const httpStatus = require("http-status-codes").StatusCodes;
const productModel = require("../../models/product.model");
const imageMiddleware=require('../../middleware/image.middleware')
module.exports = {
  async findProduct(data) {
    try {
      const product = await productModel.aggregate(data);
      return product;
    } catch (error) {
      createError(500, error);
    }
  },

  updateProduct: async (conditions, dataToUpdate) => {
    try {
      const updateResult = await productModel.findByIdAndUpdate(conditions, dataToUpdate,{new:true});
      return updateResult
    } catch (error) {
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  createProduct: async (product) => {
    try {
      const newUser = await productModel.create(product);
      return newUser;
    } catch (error) {
      console.log(error);
      createError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },

  productPic: function (url){
    try {
      if(!url || url===undefined){
        return imageMiddleware.getFiles('product/1.png')
      }
      else{
        return imageMiddleware.getFiles(`product/${url}`)
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}