import express from "express"
const router = express.Router();
import { register, login, logout, createUser, getUserList, getAdminInfo, updateUser } from "../controllers/auth-controller.js";

router.route("/user").post(createUser).patch(updateUser)
router.route("/register").post(register)
router.route("/login").post(login)
router.route('/logout').get(logout)
router.route("/getUserList").get(getUserList)
router.route("/getAdminInfo").get(getAdminInfo)



export default router

