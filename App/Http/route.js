import express from "express";
import UserController from "../Controllers/UserController";

const Router = express.Router();

//Open route
Router.route('/get/user/token').post(UserController.verifyLogin);
Router.route('/user/registration').post(UserController.create);

/*Router.route('/view/user/:userId/profile').get(UserController.findById);*/
//Set User Authentication Middleware

// Router.use(Authentication)
//     .route('/verify/token').get(UserController.verifyToken);
// Router.route('/user/get/all').get(UserController.all);
// Router.route('/update/user/profile').put(UserController.edit);

//User route

export default {
    Router
};