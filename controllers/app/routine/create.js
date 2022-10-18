const routineService=require('../../service/routine.service')
const mongoose=require('mongoose')

const createroutine=async(req,res)=>{
    try {
        const data={
            ...req.body,
            userId:mongoose.Types.ObjectId(req.decoded._id)
        }
        const routine=await routineService.createRoutine(req.body)
        if(routine){
            return res.status(201).json({
                success:true,
                message:'routine added successfully',
                routine:routine
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to create routine"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[createroutine]