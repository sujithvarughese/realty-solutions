import classes from "../../../pages/accounting/styles/UnitFinancials.module.css"
import { CreateRentReceiptForm, SearchRentReceiptsForm } from "../../index.js";
import { useEffect, useState } from "react";
import { RentReceipt } from "../../index.js";
import { axiosDB } from "../../../utils/axios.js";
import {InputSelect} from "../../../UI/index.js";

const Rents = ({ unitID, street, city, state, zip, firstName, lastName, user }) => {

	const [rentReceipts, setRentReceipts] = useState([]);

	const date = new Date()
	const [year, setYear] = useState(date.toLocaleString('en-us',{ year:'numeric' }))
	useEffect(() => {
		const fetchTenantData = async () => {
			try {
				const response = await axiosDB(`/finance/rent/${user}/${year}`)
				const { rentReceipts } = response.data
				const updatedReceipts = rentReceipts.map(receipt => {
					return {
						...receipt,
						unitID,
						street,
						city,
						state,
						zip,
						lastName,
						firstName,
						user
					}
				})
				setRentReceipts(updatedReceipts)
			} catch (error) {
				console.log(error)
			}
		}
		fetchTenantData()
	}, []);



	return (
		<div className={classes.table}>
			<div className={classes.head}>
				Rent Receipts
			</div>
			<SearchRentReceiptsForm user={user} setRentReceipts={setRentReceipts}/>

			<div>
				{
					rentReceipts?.map(receipt =>
						<RentReceipt
							key={receipt._id}
							{...receipt}
						/>
					)
				}
			</div>
		</div>
	);
};


export default Rents;