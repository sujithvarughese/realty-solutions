import classes from "./styles/CreateAccountAdminRegistrationForm.module.css";
import {Button, Card, Form, Input} from "../../ui/index.js";
import {useState} from "react";
import {axiosDB} from "../../utils/axios.js";

const initialState = {
    email: "",
    phone: "",
    password: "",
    lastName: "",
    firstName: ""
}
const CreateAccountAdminRegistrationForm = ({ cancel, account }) => {

    const [values, setValues] = useState(initialState)

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosDB.post("/accounts", { ...values, account: account, role: "account-admin" })
            const { registration } = response.data
            console.log(registration)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
            <Card>
                <Form onSubmit={handleSubmit} title="Create Account Admin Registration">
                    <div className={classes.form}>
                        Admin Info:
                        <div className={classes.name}>
                            <Input
                                htmlFor="lastName"
                                placeholder="LAST NAME"
                                type="text"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                            ></Input>
                            <Input
                                htmlFor="firstName"
                                placeholder="FIRST NAME"
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                            ></Input>
                        </div>
                        <div className={classes.contact}>
                            <Input
                                htmlFor="email"
                                placeholder="EMAIL"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            ></Input>
                            <Input
                                htmlFor="phone"
                                placeholder="PHONE"
                                type="text"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                            ></Input>
                        </div>
                        <div className={classes.buttons}>
                            <Button type="submit">Create Account</Button>
                            <Button type="button" onClick={cancel}>Cancel</Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CreateAccountAdminRegistrationForm;