const userChangeService=require('../../../models/userChanges.model')

const readUserEntry=async(req,res)=>{
    try {
        const user=await userChangeService.findByIdAndUpdate({_id:req.params.userId},{read:true})
        if(user.length>0){
            return res.status(201).json({
                success:true,
                message:'user List',
                user:user
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"no user",
                user:user
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[readUserEntry]