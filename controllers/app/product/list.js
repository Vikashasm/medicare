const productModel=require('../../../models/product.model')
const productService=require('../../service/product.service')
const mongoose=require('mongoose')

const lisProduct=async(req,res)=>{
    try {
        const conditions = [
            {
              $match: {
                $or:[
                    {
                        userId: mongoose.Types.ObjectId(req.decoded._id),
                    },
                    {
                        isPublic:true
                    }
                ]
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
          ];
        const product=await productService.findProduct(conditions)
        await Promise.all(
            product.map(async (item) => {
              item.productImagePath =await productService.productPic(item.productImage);
            })
          );
        if(product.length>0){
            return res.status(201).json({
                success:true,
                message:'Product list',
                product:product
            })
        }else{    
            return res.status(201).json({
                success:false,
                message:"Product list",
                product:product
            })
        }
    } catch (error) {
        return error
    }
}

module.exports=[lisProduct]