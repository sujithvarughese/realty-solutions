import express from "express";
const router = express.Router()
import { createRegistration, verifyRegistration } from "../controllers/registration-controller.js";

router.route("/create").post(createRegistration)
router.route("/verify").post(verifyRegistration)