import express from "express";
const router = express.Router()
import {
    createMessage,
    getAllMessages,
    getMessage,
    markMessageRead,
    toggleFlag,
    deleteMessage,
    getInbox,
    getOutbox,
    getPreviousMessages
} from "../controllers/messages-controller.js";


router.route("/inbox").get(getInbox)
router.route("/outbox").get(getOutbox)
router.route("/read").patch(markMessageRead)
router.route("/flag").patch(toggleFlag)
router.route("/previous/:message").get(getPreviousMessages)
router.route("/:message").get(getMessage)
router.route("/").get(getAllMessages).post(createMessage).delete(deleteMessage)
export default router