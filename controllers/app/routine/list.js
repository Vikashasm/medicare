const routineService=require('../../service/routine.service')
const mongoose=require('mongoose')

const listRoutine=async(req,res)=>{
    try {
        const conditions = [
            {
              $match: 
                    {
                        userId: mongoose.Types.ObjectId(req.decoded._id),
                    },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
          ];
        const routine=await routineService.findRoutine(conditions)
        const today=[]
        const yesterday=[]
        let oneDay = 24 * 60 * 60 * 1000
        if(routine.length>0){
            for (let i = 0; i < routine.length; i++) {
                new Date(routine[i].createdAt).getDate()===new Date(Date.now()).getDate() && new Date(routine[i].createdAt).getMonth()===new Date(Date.now()).getMonth() && 
                new Date(routine[i].createdAt).getFullYear()===new Date(Date.now()).getFullYear()? today.push(routine[i]):null
                new Date(routine[i].createdAt).getDate()===new Date(Date.now() - oneDay).getDate() && new Date(routine[i].createdAt).getMonth()===new Date(Date.now() - oneDay).getMonth() && 
                new Date(routine[i].createdAt).getFullYear()===new Date(Date.now() - oneDay).getFullYear()? yesterday.push(routine[i]):null
            }
            if(req.params.day==="today"){
                return res.status(201).json({
                    success:true,
                    message:'routine list',
                    routine:today
                })
            }
            else if(req.params.day==="yesterday"){
                return res.status(201).json({
                    success:true,
                    message:'routine list',
                    routine:yesterday
                })
            }
        }else{
            return res.status(201).json({
                success:true,
                message:"no routine found",
                routine:routine
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[listRoutine]