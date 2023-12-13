import classes from "./styles/UserRegistrationConfirmation.module.css";

const UserRegistrationConfirmation = ({ email, code }) => {
    return (
        <div className={classes.container}>
            <div>User details created for {email}.</div>
            <div> Please have tenant complete registration with the following code.</div>
            <div className={classes.code}>{code}</div>
        </div>
    );
};

export default UserRegistrationConfirmation;