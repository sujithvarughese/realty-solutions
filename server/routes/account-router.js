import express from "express";
const router = express.Router()
import { createAccount, createSystemAdmin, getAccounts } from "../controllers/account-controller.js";

router.route("/").get(getAccounts).post(createAccount)
router.route("/system").post(createSystemAdmin)

export default router