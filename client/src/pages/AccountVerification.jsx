import classes from "./styles/AccountVerification.module.css";
import {Button, Form, Input} from "../UI/index.js";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {useGlobalContext} from "../context/GlobalContext.jsx";

const AccountVerification = () => {

    const location = useLocation()
    const { user } = location.state
    const { verifyAccount } = useGlobalContext()
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordRetype, setNewPasswordRetype] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newPassword.length < 6 || newPassword !== newPasswordRetype) {
            console.log("password mismatch")
            return
        }
        console.log("verified")
        verifyAccount({ userID: user.userID, newPassword })

    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className={classes.form}>
                    Email: {user.email}
                    Last Name: {user.lastName}
                    FirstName: {user.firstName}
                    <Input
                        htmlFor="newPassword"
                        placeholder="PASSWORD"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                    ></Input>
                    <Input
                        htmlFor="newPasswordRetype"
                        placeholder="CONFIRM PASSWORD"
                        type="password"
                        name="newPasswordRetype"
                        value={newPasswordRetype}
                        onChange={(e)=>setNewPasswordRetype(e.target.value)}
                    ></Input>


                </div>
                <div className={classes.button}>
                    <Button type="submit">Create Account</Button>
                </div>


            </Form>
        </div>
    );
};

export default AccountVerification;