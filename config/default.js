const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  hosts: [
    "https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3002","http://localhost:3001"
  ],
  HOST:["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000"],
  allowedOrigins: ["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3001","http://localhost:3002"],
  fileUrl: "http://localhost:3000",
  imagePath: path.join(__dirname,'../uploads/'),
  tokenDuration: "30d",
  sgMail:process.env.sgMail,
  ID:'AKIA5HXAFU4WLRQPW2BO',
  KEY:'7MFtXiLV3V2nGZskZzjBPg05reL3DulzfDtn/Kmu',
  bucket:'medicare-app'
};