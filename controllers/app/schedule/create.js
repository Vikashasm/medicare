const scheduleService=require('../../service/schedule.service')
const mongoose=require('mongoose')

const addSchedule=async(req,res)=>{
    try {
        const data={
            ...req.body,
            userId:mongoose.Types.ObjectId(req.decoded._id)
        }
        const schedule=await scheduleService.createSchedule(data)
        if(schedule){
            return res.status(201).json({
                success:true,
                message:'schedule added successfully',
                schedule:schedule
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to create schedule"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[addSchedule]