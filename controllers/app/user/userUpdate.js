const userService=require('../../service/user.service')
const userChanges=require('../../../models/userChanges.model')

const mongoose=require('mongoose')

const updateUserDetail=async(req,res)=>{
    try {
        const users=await userService.updateUser({_id:mongoose.Types.ObjectId(req.decoded._id)},req.body)
        if(users){
            const data={
                ...req.body,
                userId:mongoose.Types.ObjectId(req.decoded._id),
                profileId:users.profileId
            }
            const userChange=await userChanges.create(data)
            return res.status(201).json({
                success:true,
                message:'users deleted successfully',
                users:users
            })
        }else{
            return res.status(400).json({
                success:true,
                message:"fail to update user",
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[updateUserDetail]