import classes from "./styles/MessageContents.module.css";
import { Card } from "../../UI"
import {useState} from "react";
import {useGlobalContext} from "../../context/GlobalContext.jsx";

const MessageContents = ({ senderID, lastName, firstName, date, subject, body }) => {

    const currentDate = new Date(date)
    const dateStr = currentDate.toLocaleString('en-US',{ year:'numeric', month:'short', day:'numeric', timeZone: 'UTC' })
    const time = currentDate.toLocaleTimeString("en-US")

    const { user } = useGlobalContext()
    console.log(senderID)
    console.log(user.userID)
    return (
        <div className={user.userID === senderID ? classes.senderContainer : classes.recipientContainer}>
            <Card>
                <div className={classes.contents}>
                    <div className={classes.head}>
                        On {dateStr} {time}, {firstName} {lastName} wrote:
                    </div>
                    <div className={classes.body}>
                        {body}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MessageContents;