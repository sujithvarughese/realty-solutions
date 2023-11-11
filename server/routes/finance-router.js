import express from "express"
const router = express.Router();
import { getRentReceipts, createRentReceipt, createUnitFinances, getUnitFinances } from "../controllers/finance-controller.js";

router.route("/rent/:id/:year/:month").get(getRentReceipts)
router.route("/rent").post(createRentReceipt)
router.route("/:unit").get(getUnitFinances)
router.route("/").post(createUnitFinances)



export default router

