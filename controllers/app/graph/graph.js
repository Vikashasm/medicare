const routineService=require('../../service/routine.service')
const mongoose=require('mongoose')

const checkrequest = async (req, res, next) => {
    try {
      if (req.query.setdate) {
        const newDate = await routineService.listAccToDate(
          req.query.setdate,
        );
        req.data = {};
        req.data.date = newDate;
        next();
      } else {
        let oneDay = 24 * 60 * 60 * 1000;
        let data = new Date();
        let dates = { start: new Date(Date.now() - oneDay), end: data };
        req.data = {};
        req.data.date = dates;
        next();
      }
    } catch (error) {
      return error;
    }
  };
  

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
        const wellSleepLast=String(req.query.type)
        console.log(wellSleepLast)
        const dateRange = await routineService.getDatesInRange(
            req.data.date.start,
            req.data.date.end
          );
          if(req.query.type=="wellSleepLastNight"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].wellSleepLastNight)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }else if(req.query.type=="sleepingHoursLastNight"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].sleepingHoursLastNight)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
          else if(req.query.type=="stressLevel"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].stressLevel)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }else if(req.query.type=="ExerciseTimeToday"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].ExerciseTimeToday)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
          else if(req.query.type=="workoutIntensity"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].workoutIntensity)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              userCounts.length>0?dateRange[i].count = userCounts[0]:dateRange[i].count = userCounts[0].length;
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
          else if(req.query.type=="amountOfWaterToday"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].amountOfWaterToday)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
          else if(req.query.type=="bowelMovementsToday"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].bowelMovementsToday)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
          else if(req.query.type=="digestiveDiscomfort"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].digestiveDiscomfort)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
          else if(req.query.type=="itchingIntensity"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].itchingIntensity)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
          else if(req.query.type=="psoriasisScaling"){
            for (let i = 0; i < dateRange.length; i++) {
              let userCounts = [];
              for (let j = 0; j < routine.length; j++) {
                new Date(routine[j].createdAt).getMonth() ===
                  new Date(dateRange[i].createdAt).getMonth() &&
                new Date(routine[j].createdAt).getDate() ===
                  new Date(dateRange[i].createdAt).getDate()
                  ? userCounts.push(routine[j].psoriasisScaling)
                  : userCounts.push(0);
              }
              console.log(userCounts)
              
              dateRange[i].count = userCounts[0];
              dateRange[i].createdAt =
                dateRange[i].createdAt.getDate();
            }
          }
        if(routine.length>0){
            return res.status(201).json({
                success:true,
                message:'routine list',
                routine:dateRange
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"no routine found",
                routine:dateRange
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[checkrequest,listRoutine]