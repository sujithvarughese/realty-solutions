import classes from "./styles/CalculateMonthlyPaymentForm.module.css";
import {useState} from "react";
import { calculateMonthlyPayment}  from "../../../utils/financeCalcs.js";
import {Button, Form, Input} from "../../../UI/index.js";

const CalculateMonthlyPaymentForm = ({ principal, apr, termYears, setMonthlyPayment}) => {

    const [values, setValues] = useState({
        principal: principal,
        apr: apr,
        termYears: termYears,
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        const payment = calculateMonthlyPayment(values.principal, values.apr, values.termYears)
        setMonthlyPayment(payment)
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
                    <Button>
                        Get Monthly Payment
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CalculateMonthlyPaymentForm;