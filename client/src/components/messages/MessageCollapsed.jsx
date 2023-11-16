import classes from "./styles/MessageCollapsed.module.css";
import { TbFlagFilled } from "react-icons/tb";
import { FcInfo } from "react-icons/fc"

const MessageCollapsed = ({ message, setExpandedMessage, markMessageRead, showExpanded }) => {

	const { date, sender, subject, body, read, flag } = message

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
				<div className={classes.read}>
					{ !read && <FcInfo />}
				</div>
				<div className={classes.flag}>
					{ flag && <TbFlagFilled /> }
				</div>
			</div>

			{/* message contents */}
			<div className={classes.details}>
				<div className={classes.senderDate}>
					<div className={classes.sender}>
						{sender.lastName}, {sender.firstName}
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