import express from "express";
const router = express.Router()
import { createRegistration, verifyRegistration } from "../controllers/registration-controller.js";
import {authorizePermissions} from "../middleware/authentication.js";

router.route("/create").post(authorizePermissions, createRegistration)
router.route("/verify").post(verifyRegistration)

export default router