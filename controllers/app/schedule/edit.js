const scheduleService=require('../../service/schedule.service')
const scheduleModule=require('../../../models/schedule.model')
const mongoose=require('mongoose')

const updateScheduleData=async(req,res,next)=>{
    try {
        if(req.body.active){
            const schedule=await scheduleModule.updateOne({
                _id:mongoose.Types.ObjectId(req.params.scheduleId),
                "SelectedDays":{
                    '$elemMatch':{
                        "_id":mongoose.Types.ObjectId(req.body.selectedDaysId),
                        "medicineTaken._id":mongoose.Types.ObjectId(req.body.medicineTakenId)
                    }
                }
            }, {
                $set:{
                    "SelectedDays.$[outer].medicineTaken.$[inner].active":req.body.active,
                }
            },
            {
                arrayFilters: [
                  { "outer._id":mongoose.Types.ObjectId(req.body.selectedDaysId)},
                  {"inner._id": mongoose.Types.ObjectId(req.body.medicineTakenId)}
        
              ]
            }
            )
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

const updateSelected=async(req,res,next)=>{
    try {
        if(req.body.selected){
            const schedule=await scheduleModule.updateOne({_id:mongoose.Types.ObjectId(req.params.scheduleId),
                "SelectedDays._id":mongoose.Types.ObjectId(req.body.selectedDaysId)}, {
                $set:{
                  "SelectedDays.$.selected":req.body.selected,
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
        delete req.body.selectedDaysId
        delete req.body.medicineTakenId
        delete req.body.active
        delete req.body.selected
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

module.exports=[updateScheduleData,updateSelected,updateSchedule]