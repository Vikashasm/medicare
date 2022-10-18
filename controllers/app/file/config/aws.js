const AWS=require('aws-sdk');
const config=require('config');

AWS.config.update({
  accessKeyId: `${config.ID}`,
  secretAccessKey: `${config.KEY}`,
});


module.exports =new AWS.S3();

  