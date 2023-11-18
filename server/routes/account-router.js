import express from "express";
const router = express.Router()
import { createAccount } from "../controllers/account-controller.js";

router.route("/create").post(createAccount)