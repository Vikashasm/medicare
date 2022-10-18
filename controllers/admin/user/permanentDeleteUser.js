const userService=require('../../service/user.service')
const mongoose=require('mongoose')

const deleteUserPermanent=async(req,res)=>{
    try {
        const users=await userService.deleteUser({_id:mongoose.Types.ObjectId(req.params.userId)})
        if(users.deletedCount>0){
            return res.status(201).json({
                success:true,
                message:'users deleted successfully',
                users:users
            })
        }else{
            return res.status(400).json({
                success:true,
                message:"fail to delete user",
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[deleteUserPermanent]