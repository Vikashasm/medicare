const routineService=require('../../service/routine.service')
const mongoose=require('mongoose')

const deleteRoutineLog=async(req,res)=>{
    try {
        const routine=await routineService.deleteRoutine({_id:mongoose.Types.ObjectId(req.params.routineLogId)})
        if(routine.deletedCount===1){
            return res.status(201).json({
                success:true,
                message:'routine deleted successfully',
                routine:routine
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to delete routine"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[deleteRoutineLog]