import classes from "./styles/MessageActions.module.css";
import { RiReplyFill } from "react-icons/ri"
import { TbFlag, TbFlagFilled } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5"
import { axiosDB } from "../../utils/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const MessageActions = ({ message, reply, toggleFlag }) => {

	const { user } = useGlobalContext()
	const { date, sender, recipient, subject, body, read, flag } = message

	return (
		<div className={classes.actions}>

			{
				user?.userID === recipient._id &&
				<div className={classes.reply} onClick={reply}>
					<RiReplyFill />
				</div>
			}


			<div className={classes.flag} onClick={()=>toggleFlag(message)}>
				{ flag ? <TbFlagFilled /> : <TbFlag />}
			</div>
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