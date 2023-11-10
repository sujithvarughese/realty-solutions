import classes from "./styles/CreateRentReceiptForm.module.css";
import { Form, Input, InputSelect, Button } from "../../UI";
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

const CreateRentReceiptForm = ({ cancel }) => {

	const [tenantList, setTenantList] = useState([])
	const [values, setValues] = useState(initialState)

	useEffect(() => {
		// fetch address book for admin
		const getUserList = async () => {
			try {
				const response = await axiosDB("/auth/getUserList")
				const { userList } = response.data
				// userList { text: lastName, firstName, value: id  }
				setTenantList(userList)
				setValues({ ...values, user: userList[0]?.value})
			} catch (error) {
				console.log(error);
			}
		}
		getUserList()
	}, [])



	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(values);
		createRentReceipt(values)
	}
	return (
		<Form onSubmit={handleSubmit}>
			<InputSelect
				htmlFor="user"
				label="user: "
				type="text"
				name="user"
				list={tenantList}
				onChange={handleChange}
			></InputSelect>
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
				label="month: "
				type="text"
				name="month"
				list={months}
				onChange={handleChange}
			></InputSelect>
			<Input
				htmlFor="date"
				label="Date: "
				type="String"
				name="date"
				value={values.date}
				onChange={handleChange}
			></Input>
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
			<Button type="submit">Create Rent Receipt</Button>
			<Button onClick={cancel}>Close</Button>
		</Form>
	);
};

const createRentReceipt = async (rentReceipt) => {
	try {
		const response = await axiosDB.post("/finance/rent", rentReceipt)
		const { newRentReceipt } = response.data
		console.log(newRentReceipt);
	} catch (error) {
		console.log(error);
	}
}
const years = ["2023", "2022", "2021", "2020"]

const months = ["January","February","March","April","May","June","July",
	"August","September","October","November","December"];

export default CreateRentReceiptForm;