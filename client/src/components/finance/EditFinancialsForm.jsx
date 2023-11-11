import classes from "./styles/EditFinancialsForm.module.css";
import { Button, Form, Input, Card } from "../../UI/index.js";
import { useState } from "react";

const initialState = {
	purchasePrice: "",
	rent: "",
	fairMarketRent: "",
	mortgage: {
		bank: "",
		loanAmount: "",
		balance: "",
		interest: "",
		payment: ""
	}

}

const EditFinancialsForm = ({ unit, cancel }) => {

	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	return (
		<div className={classes.container}>
		<Card>
			<Form>
				<div className={classes.form}>
					<div className={classes.row1}>
						<Input
							htmlFor="purchasePrice"
							placeholder="PURCHASE PRICE"
							type="number"
							name="purchasePrice"
							value={values.purchasePrice}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="rent"
							placeholder="RENT"
							type="number"
							name="rent"
							value={values.rent}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="fairMarketRent"
							placeholder="FAIR MARKET RENT"
							type="number"
							name="fairMarketRent"
							value={values.fairMarketRent}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.row2}>
						<Input
							htmlFor="bank"
							placeholder="BANK"
							type="text"
							name="bank"
							value={values.mortgage.bank}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.row3}>
						<Input
							htmlFor="loanAmount"
							placeholder="LOAN AMOUNT"
							type="number"
							name="loanAmount"
							value={values.mortgage.loanAmount}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="balance"
							placeholder="BALANCE"
							type="number"
							name="balance"
							value={values.mortgage.balance}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.row4}>
						<Input
							htmlFor="interest"
							placeholder="INTEREST"
							type="number"
							name="interest"
							value={values.mortgage.interest}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="payment"
							placeholder="PAYMENT"
							type="number"
							name="payment"
							value={values.mortgage.payment}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.buttons}>
						<Button type="submit">Create Account</Button>
						<Button onClick={cancel}>Cancel</Button>
					</div>
				</div>
			</Form>
		</Card>
		</div>
	);
};

export default EditFinancialsForm;