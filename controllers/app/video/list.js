const videoService=require('../../service/video.service')

const listVideos=async(req,res)=>{
    try {
        const conditions = [
            {
              $sort: {
                createdAt: -1,
              },
            },
          ];
        const video=await videoService.findVideo(conditions)
        if(video.length>0){
            await Promise.all(video.map(async videos=>{
                videos.videoImagePath = await videoService.videoPic(videos.video);
            }))
            // await Promise.all(video.map(async thumbnails=>{
            //     thumbnails.thumbnail=`${thumbnails.videoImagePath.split(".")[0]}_1.png`
            // }))
            return res.status(201).json({
                success:true,
                message:'video list',
                video:video
            })
        }else{
            return res.status(201).json({
                success:true,
                message:"no video found",
                video:video
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[listVideos]