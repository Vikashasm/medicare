const videoService=require('../../service/video.service')

const createvideo=async(req,res)=>{
    try {
        if(req.body.thumbnail){
            req.body.thumbnail=req.body.thumbnail
        }else{
            req.body.thumbnail=null
        }
        const videos=await videoService.addVideo(req.body)
        console.log(videos)
        let createdvideo = JSON.parse(JSON.stringify(videos));
        createdvideo.videoImagePath =await videoService.videoPic(videos.video);
        if(createdvideo){
            return res.status(201).json({
                success:true,
                message:'video added successfully',
                video:createdvideo
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"failed to create video"
            })
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports=[createvideo]