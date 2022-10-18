const userService=require('../../../models/userChanges.model')

const listUserChanges=async(req,res)=>{
    try {
        const condition=[
            {
                $match:{
                    read:false
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            }
        ]
        const users=await userService.aggregate(condition)
        if(users.length>0){
            return res.status(201).json({
                success:true,
                message:'users List',
                users:users
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"no user",
                users:users
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[listUserChanges]