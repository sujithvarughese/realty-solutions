import classes from "./styles/Rents.module.css"
import { useLoaderData } from "react-router-dom";
import { Button, Form, InputSelect } from "../../../UI";
import { CreateRentReceiptForm } from "../../../components";
import { useEffect, useState } from "react";
import { RentReceipt } from "../../../components";
import { axiosDB } from "../../../utils/axios.js";

const Rents = () => {
	const userList = useLoaderData()
	const [showCreateRentReceiptForm, setShowCreateRentReceiptForm] = useState(false)
	const [tenant, setTenant] = useState(userList[0]?.value)
	const [year, setYear] = useState("2023")
	const [month, setMonth] = useState("January")
	const [rentReceipts, setRentReceipts] = useState([]);

	const [userInfo, setUserInfo] = useState(null)

	const getRentReceipts = async () => {
		const response = await axiosDB(`/finance/rent/${tenant}/${year}/${month}`)
		const { rentReceipts } = response.data
		console.log(response.data);
		setRentReceipts(rentReceipts)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getRentReceipts(year, month)
	}

	const selectTenant = async (tenant) => {
		try {
			const response = await axiosDB(`/auth/getUserInfo/${tenant._id}`)
			const { name, address } = response.data
			setUserInfo({ name, address })
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		selectTenant()
	}, [tenant])
	return (
		<div className={classes.container}>

			<div className={classes.searchContainer}>
				<div className={classes.search}>
					<div className={classes.title}>
						Search Rent Receipts
					</div>
					<Form onSubmit={handleSubmit}>
						<div className={classes.form}>
							<div className={classes.tenant}>
								<InputSelect
									htmlFor="tenant"
									label="tenant"
									type="text"
									name="tenant"
									list={userList}
									onChange={(e)=>setTenant(e.target.value)}
								></InputSelect>
							</div>
							<div className={classes.year}>
								<InputSelect
									htmlFor="year"
									label="year: "
									type="text"
									name="year"
									list={years}
									onChange={(e)=>setYear(e.target.value)}
								></InputSelect>
							</div>
							<div className={classes.month}>
								<InputSelect
									htmlFor="month"
									label="month: "
									type="text"
									name="month"
									list={months}
									onChange={(e)=>setMonth(e.target.value)}
								></InputSelect>
							</div>

						</div>
						<div className={classes.button}>
							<Button type="submit">Search</Button>
						</div>
					</Form>
				</div>
				<div className={classes.results}>
					{
						rentReceipts?.map(receipt =>
							<RentReceipt
								key={receipt._id}
								{...receipt}
								lastName={name.lastName}
								firstName={name.firstName}
							/>

						)
					}
				</div>
			</div>


			<div className={classes.formMobile}>
				{
					!showCreateRentReceiptForm &&
					<Button onClick={()=>setShowCreateRentReceiptForm(true)}>Create Rent Receipt</Button>
				}
			</div>


			<div className={classes.create}>
				<div className={classes.title}>
					Create Rent Receipt
				</div>
				<CreateRentReceiptForm cancel={()=>setShowCreateRentReceiptForm(false)}/>
			</div>

		</div>
	);
};

export const rentsLoader = async () => {
	try {
		const response = await axiosDB("/auth/getUserList")
		const { userList } = response.data
		return userList
	} catch (error) {
		console.log(error);
	}
}

const years = ["2023", "2022", "2021", "2020"]

const monthsNum = [
	{ text: "January", value: "01" },
	{ text: "February", value: "02" },
	{ text: "March", value: "03" },
	{ text: "April", value: "04" },
	{ text: "May", value: "05" },
	{ text: "June", value: "06" },
	{ text: "July", value: "07" },
	{ text: "August", value: "08" },
	{ text: "September", value: "09" },
	{ text: "October", value: "10" },
	{ text: "November", value: "11" },
	{ text: "December", value: "12" }
];

const months = ["January","February","March","April","May","June","July",
	"August","September","October","November","December"];
export default Rents;