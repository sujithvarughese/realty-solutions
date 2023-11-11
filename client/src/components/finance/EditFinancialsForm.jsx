import classes from "./styles/EditFinancialsForm.module.css";
import { Button, Form, Input, Card } from "../../UI/index.js";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";

const initialMortgageState = {
	bank: "",
	loanAmount: "",
	balance: "",
	interest: "",
	payment: ""
}
const initialState = {
	purchasePrice: "",
	rent: "",
	fairMarketRent: "",
	mortgage: initialMortgageState
}


const EditFinancialsForm = ({ unit, cancel }) => {

	const [values, setValues] = useState(initialState)
	const [mortgageValues, setMortgageValues] = useState(initialMortgageState)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}
	const handleMortgageChange = (e) => {
		setMortgageValues({ ...mortgageValues, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		createUnitFinances({ ...values, mortgage: { ...mortgageValues }, unit: unit._id })
		cancel()
	}

	return (
		<div className={classes.container}>
		<Card>
			<Form onSubmit={handleSubmit}>
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
							value={mortgageValues.bank}
							onChange={handleMortgageChange}
						></Input>
					</div>
					<div className={classes.row3}>
						<Input
							htmlFor="loanAmount"
							placeholder="LOAN AMOUNT"
							type="number"
							name="loanAmount"
							value={mortgageValues.loanAmount}
							onChange={handleMortgageChange}
						></Input>
						<Input
							htmlFor="balance"
							placeholder="BALANCE"
							type="number"
							name="balance"
							value={mortgageValues.balance}
							onChange={handleMortgageChange}
						></Input>
					</div>
					<div className={classes.row4}>
						<Input
							htmlFor="interest"
							placeholder="INTEREST"
							type="number"
							name="interest"
							value={mortgageValues.interest}
							onChange={handleMortgageChange}
						></Input>
						<Input
							htmlFor="payment"
							placeholder="PAYMENT"
							type="number"
							name="payment"
							value={mortgageValues.payment}
							onChange={handleMortgageChange}
						></Input>
					</div>
					<div className={classes.buttons}>
						<Button type="submit">Update Finances</Button>
						<Button onClick={cancel}>Cancel</Button>
					</div>
				</div>
			</Form>
		</Card>
		</div>
	);
};

const createUnitFinances = async (financeData) => {
	try {
		const response = await axiosDB.post("/finance", financeData)
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
}

export default EditFinancialsForm;