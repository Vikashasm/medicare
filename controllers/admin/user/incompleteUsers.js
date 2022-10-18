const userService=require('../../service/user.service')

const listUsers=async(req,res)=>{
    try {
        const condition=[
            {
                $match:{
                    isDeleted:false
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
            let newUsersList=[]
            await Promise.all(users.map(async user=>{
                if(!user.phone){
                    user.profileImagePath=await userService.userImage(user.profileImage)
                    newUsersList.push(user)
                }
                else if(!user.email){
                    user.profileImagePath=await userService.userImage(user.profileImage)
                    newUsersList.push(user)
                }
                
            }))
            return res.status(201).json({
                success:true,
                message:'users List',
                users:newUsersList
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

module.exports=[listUsers]