import classes from "./styles/MessageActions.module.css";
import { RiReplyLine } from "react-icons/ri"
import { TiFlag, TiFlagOutline } from "react-icons/ti"
import { CiUnread } from "react-icons/ci"
import { IoTrashOutline } from "react-icons/io5"
import { axiosDB } from "../../utils/axios.js";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import {ButtonIcon} from "../../ui/index.js";
import {TfiControlBackward} from "react-icons/tfi";

const MessageActions = ({ message, reply, toggleFlag, markMessageUnread, setMobileExpanded }) => {

	const { user } = useGlobalContext()
	const { date, sender, recipient, subject, body, read, flag } = message

	return (
		<div className={classes.actions}>
			<div className={classes.back}>
				<ButtonIcon onClick={()=>setMobileExpanded(false)}><TfiControlBackward /></ButtonIcon>
			</div>

			<div className={classes.subjectContainer}>
				<span className={classes.subjectLabel}>Subject:</span> <span className={classes.subject}>{message.subject}</span>
			</div>

			<div className={classes.reply} onClick={reply}>
				<RiReplyLine />
			</div>

			<div className={classes.flag} onClick={()=>toggleFlag(message)}>
				{ flag ? <TiFlag /> : <TiFlagOutline />}
			</div>

			<div className={classes.delete} onClick={()=>console.log("Unauthorized to delete!")}>
				<IoTrashOutline />
			</div>

			{
				message.read &&
				<div className={classes.unread} onClick={()=>markMessageUnread(message)}>
					<CiUnread />
				</div>
			}


		</div>
	);
};



const deleteMessage = async (message) => {
	console.log(message);
	try {
		await axiosDB.delete("/messages", message)
	} catch (error) {
		throw new Error(error)
	}
}

export default MessageActions;