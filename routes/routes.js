const appRouter = require("express").Router();
const appController = require("../controllers");
const multer = require("multer");
const Path = require("path");

const p = Path.join(`${__dirname}../../uploads/`);

var storage=multer.diskStorage({
    destination:(req,res,cb)=>{cb(null,p+req.query.folder)},
    filename:(req,file,cb)=>{
        let ext=file.originalname.split(".");
        cb(null,`${file.originalname}`)
    }
});

//contact apis
appRouter.post("/contact", appController.app.contact.create);

//user apis
appRouter.get("/", appController.app.home.home);
appRouter.post("/signup", appController.app.authentication.signup);
appRouter.post("/login", appController.app.authentication.login);
appRouter.post("/upload", multer({ storage:storage }).single("file"), appController.app.file.upload);

appRouter.post("/send/verification-mail",appController.app.authentication.sendVerificationMail);
appRouter.post("/phone/detail",appController.app.authentication.userByPhone);
// appRouter.post("/verify/otp",appController.app.authentication.verifyOtp);


appRouter.post("/user/google", appController.app.authentication.google);

const middleware = require("../middleware/verifyToken");
appRouter.use(middleware);

appRouter.post("/change/password",appController.app.authentication.change_password);
appRouter.get("/user/detail/:userId", appController.app.user.userDetail);
appRouter.put("/user/update/me", appController.app.user.userUpdate);

//product apis
appRouter.post('/product',appController.app.product.create)
appRouter.get("/product", appController.app.product.list);

//routine api
appRouter.post("/routine/log", appController.app.routine.create);
appRouter.get("/routine/list/:day", appController.app.routine.list);
appRouter.put("/routine/edit/:routineLogId", appController.app.routine.update);
appRouter.delete("/routine/delete/:routineLogId", appController.app.routine.delete);

//schedule api
appRouter.post("/add/schedule", appController.app.schedule.create);
appRouter.get("/list/schedule", appController.app.schedule.list);
appRouter.put("/edit/schedule/:scheduleId", appController.app.schedule.edit);
appRouter.delete("/delete/schedule/:scheduleId", appController.app.schedule.delete);

//routine graph api
appRouter.get("/routine/graph", appController.app.graph.graph);

module.exports = appRouter;