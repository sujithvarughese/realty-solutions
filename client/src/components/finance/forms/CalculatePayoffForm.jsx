import classes from "./styles/CalculatePayoffForm.module.css";
import { calculatePayoff } from "../../../utils/financeCalcs.js";
import { Input, Form, Button } from "../../../UI/index.js";
import {useState} from "react";

const CalculatePayoffForm = ({ principal, apr, termYears, paymentsMade, setPayoffAmount }) => {

    const [values, setValues] = useState({
        principal: principal,
        apr: apr,
        termYears: termYears,
        paymentsMade: paymentsMade
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        const payoff = calculatePayoff(values.principal, values.apr, values.termYears, values.paymentsMade)
        setPayoffAmount(payoff)
    }

    return (
        <div className={classes.container}>
        <Form onSubmit={handleSubmit}>
            <div className={classes.form}>
            <Input
                htmlFor="principal"
                label="Principal: "
                type="number"
                name="principal"
                value={values.principal}
                onChange={handleChange}
            ></Input>
            <Input
                htmlFor="apr"
                label="APR: "
                type="number"
                name="apr"
                value={values.apr}
                onChange={handleChange}
            ></Input>
            <Input
                htmlFor="termYears"
                label="Term Length (in Years): "
                type="number"
                name="termYears"
                value={values.termYears}
                onChange={handleChange}
            ></Input>
            <Input
                htmlFor="paymentsMade"
                label="Number of Payments Made: "
                type="number"
                name="paymentsMade"
                value={values.paymentsMade}
                onChange={handleChange}
            ></Input>
            <Button>
                Get Payoff Amount
            </Button>
            </div>
        </Form>
        </div>
    );
};

export default CalculatePayoffForm;