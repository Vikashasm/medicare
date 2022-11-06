const path = require("path");

module.exports = {
  DB_HOST: process.env.DB_HOST,
  secret: process.env.secret,
  hosts: [
    "https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3002","http://localhost:3001","https://medicare-application.herokuapp.com","*"
  ],
  HOST:["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","https://medicare-application.herokuapp.com"],
  allowedOrigins: ["https://6f82-49-36-182-30.ngrok.io","http://localhost:3000","http://localhost:3001","http://localhost:3002","https://medicare-application.herokuapp.com","*"],
  fileUrl: "http://localhost:3000",
  imagePath: path.join(__dirname,'../uploads/'),
  tokenDuration: "30d",
  sgMail:process.env.sgMail
}