import express from "express";
const router = express.Router()
import { createMessage, getAllMessages, replyMessage, markMessageRead, toggleFlag, deleteMessage, getInbox, getOutbox } from "../controllers/messages-controller.js";


router.route("/").get(getAllMessages).post(createMessage).delete(deleteMessage)
router.route("/inbox").get(getInbox)
router.route("/outbox").get(getOutbox)
router.route("/replay").post(replyMessage)
router.route("/read").patch(markMessageRead)
router.route("/flag").patch(toggleFlag)

export default router