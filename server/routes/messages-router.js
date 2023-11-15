import express from "express";
const router = express.Router()
import { createMessage, getAllMessages, getMessage, markMessageRead, toggleFlag, deleteMessage, getInbox, getOutbox } from "../controllers/messages-controller.js";

router.route("/:id").get(getMessage)
router.route("/").get(getAllMessages).post(createMessage).delete(deleteMessage)
router.route("/inbox").get(getInbox)
router.route("/outbox").get(getOutbox)
router.route("/read").patch(markMessageRead)
router.route("/flag").patch(toggleFlag)

export default router