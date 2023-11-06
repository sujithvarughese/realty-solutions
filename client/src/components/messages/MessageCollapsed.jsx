import classes from "./styles/MessageCollapsed.module.css";
import { TbFlagFilled } from "react-icons/tb";
import { FcInfo } from "react-icons/fc"
import { useEffect, useState } from "react";
const MessageCollapsed = ({ message, setExpandedMessage, markMessageRead, showExpanded }) => {


	const { date, sender, subject, body, read, flag } = message


	return (
		<div
			className={classes.message}
			onClick={() => {
				setExpandedMessage(message)
				markMessageRead(message)
				showExpanded()
			}}
		>
			<div className={classes.flagRead}>
				<div className={classes.flag}>
					{ flag && <TbFlagFilled /> }
				</div>
				<div className={classes.read}>
					{!read && <FcInfo />}
				</div>
			</div>

			<div className={classes.details}>

				<div className={classes.senderDate}>
					<div className={classes.sender}>
						{sender.lastName} {sender.firstName}
					</div>

					<div className={classes.date}>
						{date.substring(0, 10)}
					</div>
				</div>


				<div className={classes.subject}>
					{subject}
				</div>

				<div className={classes.body}>
					{body.substring(0, 40)}
				</div>
			</div>


		</div>

	);
};

export default MessageCollapsed;