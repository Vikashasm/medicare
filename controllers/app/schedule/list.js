const scheduleService=require('../../service/schedule.service')
const productService=require('../../service/product.service')
const mongoose=require('mongoose')

const listSchedule=async(req,res)=>{
    try {
        const conditions = [
            {
              $match: 
                    {
                        userId: mongoose.Types.ObjectId(req.decoded._id),
                    },
            },
            {
                $lookup: {
                  from: "products",
                  let: {
                    productId: "$productId",
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [{ $eq: ["$_id", "$$productId"] }],
                        },
                      },
                    },
                    {
                        $project: {
                          _id: 1,
                          id: 1,
                          productName: 1,
                          companyName: 1,
                          productImage:1,
                          createdby:1,
                          userId:1,
                          createdAt:1,
                          updatedAt:1,
                          read:1
                        },
                      },
                  ],
                  as: "product",
                },
            },
            {
                $unwind:{
                  path: "$product",
                  preserveNullAndEmptyArrays: true,
                }
               },
            {
              $sort: {
                createdAt: -1,
              },
            },
          ];
        const schedule=await scheduleService.findSchedule(conditions)
        if(schedule.length>0){
            await Promise.all(
                schedule.map(async (item) => {
                  item.product.productImagePath =await productService.productPic(item.product.productImage);
                })
              );
            return res.status(201).json({
                success:true,
                message:'schedule list',
                schedule:schedule
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"no schedule found",
                schedule:schedule
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[listSchedule]