import classes from "./styles/MessageCollapsed.module.css";
import { TbFlagFilled } from "react-icons/tb";
import { FcInfo } from "react-icons/fc"
import { RiShareForwardFill } from "react-icons/ri"
const MessageCollapsed = ({ message, setExpandedMessage, markMessageRead, showExpanded, userID }) => {

	const { sender, recipient, subject, body, read, flag } = message

	const currentDate = new Date(message.date)
	const date = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
	const time = currentDate.toLocaleTimeString("en-US")

	return (
		// selecting anywhere on collapsed message will open expanded message, and mark as read
		<div
			className={classes.container}
			onClick={() => {
				setExpandedMessage(message)
				markMessageRead(message)
				showExpanded()
			}}
		>
			{/* icons dynamically render to show flag and read status */}
			<div className={classes.flagRead}>
				<div className={classes.replied}>
					{ sender._id === userID && <RiShareForwardFill /> }
				</div>
				<div className={classes.read}>
					{ recipient._id === userID && !read && <FcInfo />}
				</div>
				<div className={classes.flag}>
					{ recipient._id === userID && flag && <TbFlagFilled /> }
				</div>
			</div>

			{/* message contents */}
			<div className={classes.details}>
				<div className={classes.senderDate}>

					{
						userID === recipient._id ?
							<div className={classes.sender}>
								{sender.lastName}, {sender.firstName}
							</div>
							:
							<div className={classes.sender}>
								{recipient.lastName}, {recipient.firstName}
							</div>
					}


					<div className={classes.date}>
						<div>
							{date}
						</div>
						<div>
							{time}
						</div>

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