import classes from "./styles/EditFinancialsForm.module.css";
import { Button, Form, Input, Card } from "../../../UI/index.js";
import { useState } from "react";
import { axiosDB } from "../../../utils/axios.js";

const initialMortgageState = {
	bank: "",
	principal: "",
	interest: "",
	term: "",
	paymentsMade: "",
	balance: "",
	monthlyPayment: ""
}
const initialInsuranceState = {
	company: "",
	agent: "",
	phone: "",
	email: "",
	payment: "",
	coverage: ""
}
const initialHoaState = {
	company: "",
	agent: "",
	phone: "",
	email: "",
	payment: "",
}
const initialState = {
	purchasePrice: "",
	rent: "",
	fairMarketRent: "",
	propertyTax: "",
	mortgage: initialMortgageState,
	insurance: initialInsuranceState,
	hoa: initialHoaState
}


const EditFinancialsForm = ({ unit, finances, cancel }) => {

	const [values, setValues] = useState(initialState)
	const [financesState, setFinanceState] = useState(initialState)
	const [mortgageValues, setMortgageValues] = useState(initialMortgageState)
	const [insuranceValues, setInsuranceValues] = useState(initialInsuranceState)
	const [hoaValues, setHoaValues] = useState(initialHoaState)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}
	const handleMortgageChange = (e) => {
		setMortgageValues({ ...mortgageValues, [e.target.name]: e.target.value });
	}
	const handleInsuranceChange = (e) => {
		setInsuranceValues({ ...insuranceValues, [e.target.name]: e.target.value });
	}
	const handleHoaChange = (e) => {
		setHoaValues({ ...hoaValues, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		createUnitFinances({ ...values, mortgage: { ...mortgageValues }, insurance: { ...insuranceValues }, hoa: { ...hoaValues }, unit: unit })
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
					<div>
						<Input
							htmlFor="propertyTax"
							placeholder="PROPERTY TAX"
							type="number"
							name="propertyTax"
							value={values.propertyTax}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.row2}>
						<div className={classes.title}>
							Mortgage
						</div>
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
							htmlFor="principal"
							placeholder="LOAN AMOUNT"
							type="number"
							name="principal"
							value={mortgageValues.principal}
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
							htmlFor="term"
							placeholder="TERM"
							type="number"
							name="term"
							value={mortgageValues.term}
							onChange={handleMortgageChange}
						></Input>
						<Input
							htmlFor="paymentsMade"
							placeholder="PAYMENTS MADE"
							type="number"
							name="paymentsMade"
							value={mortgageValues.paymentsMade}
							onChange={handleMortgageChange}
						></Input>
					</div>
					<div>
						<div className={classes.title}>
							Insurance
						</div>
						<Input
							htmlFor="company"
							placeholder="NAME OF COMPANY"
							type="text"
							name="company"
							value={insuranceValues.company}
							onChange={handleInsuranceChange}
						></Input>
						<Input
							htmlFor="agent"
							placeholder="AGENT"
							type="text"
							name="agent"
							value={insuranceValues.agent}
							onChange={handleInsuranceChange}
						></Input>
						<Input
							htmlFor="phone"
							placeholder="PHONE"
							type="text"
							name="phone"
							value={insuranceValues.phone}
							onChange={handleInsuranceChange}
						></Input>
						<Input
							htmlFor="email"
							placeholder="EMAIL"
							type="email"
							name="email"
							value={insuranceValues.email}
							onChange={handleInsuranceChange}
						></Input>
						<Input
							htmlFor="payment"
							placeholder="PAYMENT"
							type="number"
							name="payment"
							value={insuranceValues.payment}
							onChange={handleInsuranceChange}
						></Input>
						<Input
							htmlFor="coverage"
							placeholder="COVERAGE"
							type="text"
							name="coverage"
							value={insuranceValues.coverage}
							onChange={handleInsuranceChange}
						></Input>
					</div>
					<div>
						<div className={classes.title}>
							Homeowners Association
						</div>
						<Input
							htmlFor="company"
							placeholder="NAME OF COMPANY"
							type="text"
							name="company"
							value={hoaValues.company}
							onChange={handleHoaChange}
						></Input>
						<Input
							htmlFor="agent"
							placeholder="AGENT"
							type="text"
							name="agent"
							value={hoaValues.agent}
							onChange={handleHoaChange}
						></Input>
						<Input
							htmlFor="phone"
							placeholder="PHONE"
							type="text"
							name="phone"
							value={hoaValues.phone}
							onChange={handleHoaChange}
						></Input>
						<Input
							htmlFor="email"
							placeholder="EMAIL"
							type="email"
							name="email"
							value={hoaValues.email}
							onChange={handleHoaChange}
						></Input>
						<Input
							htmlFor="payment"
							placeholder="PAYMENT"
							type="number"
							name="payment"
							value={hoaValues.payment}
							onChange={handleHoaChange}
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
	} catch (error) {
		console.log(error);
	}
}

export default EditFinancialsForm;