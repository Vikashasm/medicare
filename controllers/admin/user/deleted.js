const userService=require('../../service/user.service')

const deletedUsersList=async(req,res)=>{
    try {
        const condition=[
            {
                $match:{
                    isDeleted:true
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            }
        ]
        const users=await userService.findUser(condition)
        if(users.length>0){
            await Promise.all(users.map(async user=>{
                user.profileImagePath=await userService.userImage(user.profileImage)
            }))
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

module.exports=[deletedUsersList]