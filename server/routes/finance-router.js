import express from "express"
const router = express.Router();
import { getRentReceipts, createRentReceipt } from "../controllers/finance-controller.js";

router.route("/rent/:id/:year/:month").get(getRentReceipts)
router.route("/rent").post(createRentReceipt)



export default router

