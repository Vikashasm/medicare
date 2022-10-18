/* eslint-disable consistent-return */
const Path = require("path");
const imageMiddleware = require("../../../middleware/image.middleware");


  const uploadFileForPublicStory = async (req, res, next) => {
    try {
      console.log(req.file)
        if (req.file) {
            if (req.file !== "" && imageMiddleware.isImage(req.file.originalname)) {
              const data = await imageMiddleware.uploadS3(req.file.originalname, req.query.folder );
              return res.status(200).json({
                success: true,
                message: "file uploaded successfully.",
                file:req.file.originalname
              });
            }else if(req.file !== "" && imageMiddleware.isVideo(req.file.originalname)){
              const file = await imageMiddleware.uploadS3(req.file.originalname, req.query.folder );
              const thumbnail = await imageMiddleware.uploadS3(`${req.file.originalname.split(".")[0]}_1.png`, "thumbnail");
              return res.status(200).json({
                success: true,
                message: "file uploaded successfully.",
                file:req.file.originalname
              });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "fail to upload file",
              });
        }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, isError: true, error: error.message });
    }
  };
  
  module.exports = [
    uploadFileForPublicStory
  ];