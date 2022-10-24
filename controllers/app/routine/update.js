const routineService=require('../../service/routine.service')
const mongoose=require('mongoose')

const updateRoutine=async(req,res)=>{
    try {
        const routine=await routineService.editRoutine({_id:mongoose.Types.ObjectId(req.params.routineLogId)},req.body)
        if(routine){
            return res.status(201).json({
                success:true,
                message:'routine updated successfully',
                routine:routine
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to update routine"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[updateRoutine]