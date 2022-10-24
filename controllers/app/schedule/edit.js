const scheduleService=require('../../service/schedule.service')
const mongoose=require('mongoose')

const updateSchedule=async(req,res)=>{
    try {
        const schedule=await scheduleService.editSchedule({_id:mongoose.Types.ObjectId(req.params.scheduleId)},req.body)
        if(schedule){
            return res.status(201).json({
                success:true,
                message:'schedule updated successfully',
                schedule:schedule
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to updated schedule"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[updateSchedule]