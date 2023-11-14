import classes from "./styles/CalculateProfitForm.module.css";
import {Button, Form, Input, InputSelect} from "../../../UI/index.js";
import {useState} from "react";
import {calculateProfit} from "../../../utils/financeCalcs.js";
const CalculateProfitForm = ({ propertyTax, homeInsurance, hoa, rent, setProfit }) => {

    const [values, setValues] = useState({
        annualPropertyTax: propertyTax,
        annualHomeInsurance: homeInsurance,
        monthlyHoa: hoa,
        monthlyRent: rent,
        term: 1
    })
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        const profit = calculateProfit(values.annualPropertyTax, values.annualHomeInsurance, values.monthlyHoa, values.monthlyRent, values.term)
        setProfit(profit)
    }
    return (
        <div className={classes.container}>
            <Form onSubmit={handleSubmit} title="Calculate Profit">
                <div className={classes.form}>

                    <div className={classes.row}>
                        <label htmlFor="annualPropertyTax">Annual Property Tax</label>
                        <input
                            className={classes.input}
                            type="number"
                            name="annualPropertyTax"
                            value={values.annualPropertyTax}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.row}>
                        <label htmlFor="annualHomeInsurance">Annual Insurance</label>
                        <input
                            className={classes.input}
                            type="number"
                            name="annualHomeInsurance"
                            value={values.annualHomeInsurance}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.row}>
                        <label htmlFor="monthlyHoa">Monthly Association Fee</label>
                        <input
                            className={classes.input}
                            type="number"
                            name="monthlyHoa"
                            value={values.monthlyHoa}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.row}>
                        <label htmlFor="monthlyRent">Monthly Rent Income</label>
                        <input
                            className={classes.input}
                            type="number"
                            name="monthlyRent"
                            value={values.monthlyRent}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.term}>
                        <InputSelect
                            htmlFor="term"
                            label="Term: "
                            name="term"
                            list={[{ text: "Monthly", value: 1 }, { text: "Annual", value: 12 }]}
                            value={values.term}
                            onChange={handleChange}
                        ></InputSelect>
                    </div>


                    <div className={classes.button}>
                        <Button>
                            Calculate Monthly Profit
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};
/*
                    <Input
                        htmlFor="annualPropertyTax"
                        label="Annual Property Tax: "
                        type="number"
                        name="annualPropertyTax"
                        value={values.annualPropertyTax}
                        onChange={handleChange}
                    ></Input>
                    <Input
                        htmlFor="annualHomeInsurance"
                        label="Home Insurance Annual Premium: "
                        type="number"
                        name="annualHomeInsurance"
                        value={values.annualHomeInsurance}
                        onChange={handleChange}
                    ></Input>
                    <Input
                        htmlFor="monthlyHoa"
                        label="HOA Monthly Payment "
                        type="number"
                        name="monthlyHoa"
                        value={values.monthlyHoa}
                        onChange={handleChange}
                    ></Input>
                    <Input
                        htmlFor="monthlyRent"
                        label="Rent: "
                        type="number"
                        name="monthlyRent"
                        value={values.monthlyRent}
                        onChange={handleChange}
                    ></Input>
 */
export default CalculateProfitForm;