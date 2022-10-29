const scheduleService=require('../../service/schedule.service')
const scheduleModule=require('../../../models/schedule.model')
const mongoose=require('mongoose')

const updateScheduleData=async(req,res,next)=>{
    try {
        if(req.body.medicineTaken){
            const schedule=await scheduleModule.updateOne({_id:mongoose.Types.ObjectId(req.params.scheduleId),
                "SelectedDays._id":mongoose.Types.ObjectId(req.body.medicineTakenId)}, {
                $set:{
                  "SelectedDays.$.medicineTaken":req.body.medicineTaken,
                }
            })
            next()
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

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

module.exports=[updateScheduleData,updateSchedule]