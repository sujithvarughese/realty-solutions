import express from "express"
const router = express.Router();
import {
    getYearlyRentReceipts,
    getMonthlyRentReceipts,
    createRentReceipt,
    createUnitFinances,
    getUnitFinances,
    getAllFinances
} from "../controllers/finance-controller.js";

router.route("/rent/:id/:year").get(getYearlyRentReceipts)
router.route("/rent/:id/:year/:month").get(getMonthlyRentReceipts)
router.route("/rent").post(createRentReceipt)
router.route("/:unit").get(getUnitFinances)
router.route("/").get(getAllFinances).post(createUnitFinances)



export default router

