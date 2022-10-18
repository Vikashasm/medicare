const userService=require('../../service/user.service')
const mongoose=require('mongoose')

const restoreUser=async(req,res)=>{
    try {
        const users=await userService.updateUser({_id:req.params.userId},{isDeleted:false})
        if(users){
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

module.exports=[restoreUser]