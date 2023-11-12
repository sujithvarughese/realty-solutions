import classes from "./styles/MyPayments.module.css";
import { axiosDB } from "../utils/axios.js";
import { Button, Form, InputSelect } from "../UI";
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { RentReceipt } from "../components/index.js";


const MyPayments = () => {
	const [year, setYear] = useState("2023")
	const [month, setMonth] = useState("January")
	const { user } = useGlobalContext()
	const [rentReceipts, setRentReceipts] = useState([]);

	const getRentReceipts = async (year, month) => {
		const response = await axiosDB(`/finance/rent/${user.userID}/${year}/${month}`)
		const { rentReceipts } = response.data
		setRentReceipts(rentReceipts)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getRentReceipts(year, month)
	}

	return (
		<div className={classes.container}>
			<div className={classes.formContainer}></div>
			<div className={classes.title}>
				Payment History
			</div>
			<Form onSubmit={handleSubmit}>
				<div className={classes.form}>
					<InputSelect
						htmlFor="year"
						label="year: "
						type="text"
						name="year"
						list={years}
						onChange={(e)=>setYear(e.target.value)}
					></InputSelect>
					<InputSelect
						htmlFor="month"
						label="month: "
						type="text"
						name="month"
						list={months}
						onChange={(e)=>setMonth(e.target.value)}
					></InputSelect>
				</div>
					<div className={classes.button}>
						<Button type="submit">Submit</Button>
					</div>
			</Form>

			<div className={classes.results}>
				{
					rentReceipts?.map(receipt =>
						<RentReceipt
							key={receipt._id}
							{...receipt}
						/>)
				}
			</div>
		</div>
	);
};

const years = ["2023", "2022", "2021", "2020"]

const months = ["January","February","March","April","May","June","July",
	"August","September","October","November","December"];

export default MyPayments;