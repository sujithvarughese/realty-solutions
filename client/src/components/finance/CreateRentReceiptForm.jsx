import classes from "./styles/CreateRentReceiptForm.module.css";
import { Form, Input, InputSelect, Button, Card} from "../../UI";
import { useEffect, useState } from "react";
import { axiosDB } from "../../utils/axios.js";


const initialState = {
	user: "",
	year: "2023",
	month: "January",
	date: "",
	amountPaid: 0,
	balance: 0
}

const CreateRentReceiptForm = ({ user, cancel }) => {

	const [values, setValues] = useState(initialState)
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		createRentReceipt({...values, user: user._id})
		cancel()
	}
	return (
		<div className={classes.container}>
		<Card>
		<Form onSubmit={handleSubmit}>
			<div className={classes.form}>
				<div>
					Rent Receipt for: {user.firstName} {user.lastName}
				</div>
				<div className={classes.date}>
					<div className={classes.yearMonth}>
						<InputSelect
							htmlFor="year"
							label="year: "
							type="text"
							name="year"
							list={years}
							onChange={handleChange}
						></InputSelect>
						<InputSelect
							htmlFor="month"
							label="Month: "
							type="text"
							name="month"
							list={months}
							onChange={handleChange}
						></InputSelect>
					</div>
					<div className={classes.datePaid}>
						<Input
							htmlFor="date"
							label="Date Paid: "
							type="Date"
							name="date"
							value={values.date}
							onChange={handleChange}
						></Input>
					</div>
				</div>
				<div className={classes.details}>
					<Input
						htmlFor="amountPaid"
						label="Amount Paid: "
						type="number"
						name="amountPaid"
						value={values.amountPaid}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="balance"
						label="balance: "
						type="number"
						name="balance"
						value={values.balance}
						onChange={handleChange}
					></Input>
				</div>
				<div className={classes.buttons}>
					<Button type="submit">Create Rent Receipt</Button>
					<Button onClick={cancel}>Cancel</Button>
				</div>
			</div>

		</Form>
		</Card>
		</div>
	);
};

const createRentReceipt = async (rentReceipt) => {
	try {
		const response = await axiosDB.post("/finance/rent", rentReceipt)
		const { newRentReceipt } = response.data
	} catch (error) {
		console.log(error);
	}
}
const years = ["2023", "2022", "2021", "2020"]

const months = ["January","February","March","April","May","June","July",
	"August","September","October","November","December"];

export default CreateRentReceiptForm;