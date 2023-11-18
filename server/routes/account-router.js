import express from "express";
const router = express.Router()
import {createAccount, createSystemAdmin} from "../controllers/account-controller.js";

router.route("/").post(createAccount)
router.route("/system").post(createSystemAdmin)

export default router