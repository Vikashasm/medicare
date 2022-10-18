const userService=require('../../service/user.service')
const mongoose=require('mongoose')

const softDeleteUser=async(req,res)=>{
    try {
        const users=await userService.updateUser({_id:req.params.userId},{isDeleted:true})
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

module.exports=[softDeleteUser]