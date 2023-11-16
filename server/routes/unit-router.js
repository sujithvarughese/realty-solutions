import express from "express";
const router = express.Router()
import { getUnits, getMyUnit, createUnit, updateUnit, deleteUnit } from "../controllers/unit-controller.js";
import { authorizePermissions } from "../middleware/authentication.js";

router.route("/")
      .get(authorizePermissions, getUnits)
      .post(authorizePermissions, createUnit)
      .patch(authorizePermissions, updateUnit)
      .delete(authorizePermissions, deleteUnit)

router.route("/myUnit")
      .get(getMyUnit)

export default router