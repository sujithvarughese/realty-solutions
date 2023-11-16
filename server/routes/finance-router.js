import express from "express"
const router = express.Router();
import {
    getRentReceipts,
    createRentReceipt,
    createUnitFinances,
    getUnitFinances,
    getFinancialOverview,
    updateUnitFinances
} from "../controllers/finance-controller.js";

router.route("/rent/:unit/:year").get(getRentReceipts)
router.route("/rent").post(createRentReceipt)
router.route("/:unit").get(getUnitFinances)
router.route("/").get(getFinancialOverview).post(createUnitFinances).patch(updateUnitFinances)



export default router

