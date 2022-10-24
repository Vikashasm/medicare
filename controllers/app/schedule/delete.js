const scheduleService=require('../../service/schedule.service')
const mongoose=require('mongoose')

const deleteProductSchedule=async(req,res)=>{
    try {
        const schedule=await scheduleService.deleteSchedule({_id:mongoose.Types.ObjectId(req.params.scheduleId)})
        if(schedule.deletedCount===1){
            return res.status(201).json({
                success:true,
                message:'schedule deleted successfully',
                schedule:schedule
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to delete schedule"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[deleteProductSchedule]