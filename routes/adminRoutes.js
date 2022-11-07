const adminRouter = require("express").Router();
const adminController = require("../controllers");

const middleware = require("../middleware/verifyAdminToken");
adminRouter.use(middleware);

//user apis
adminRouter.get("/admin/users",adminController.admin.user.list);
adminRouter.get("/admin/incomplete/users",adminController.admin.user.incompleteUsers);

adminRouter.get("/admin/deleted/users",adminController.admin.user.deleted);
adminRouter.delete("/admin/permanent/delete/user/:userId",adminController.admin.user.permanentDeleteUser);
adminRouter.patch("/admin/temporary/delete/user/:userId",adminController.admin.user.softDeleteUser);
adminRouter.put("/admin/restore/deleted/user/:userId",adminController.admin.user.restoreDeletedUser);

//user profile changes pis
adminRouter.get("/admin/user/profile/changes",adminController.admin.user.changesByUser);
adminRouter.put("/admin/read/user/changes/:userId",adminController.admin.user.readChangesByUser);

//product apis

adminRouter.get("/admin/user/products",adminController.admin.product.list);
adminRouter.put("/admin/read/product/:productId",adminController.admin.product.read);

//contacts list
adminRouter.get("/admin/contacts",adminController.admin.contact.list);
adminRouter.put("/admin/contact/action/:contactId",adminController.admin.contact.actionTaken);

//video apis
adminRouter.post("/admin/add/video",adminController.admin.video.add);

module.exports= adminRouter