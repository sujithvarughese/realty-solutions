import classes from "../../../pages/accounting/styles/UnitFinancials.module.css"
import { CreateRentReceiptForm, SearchRentReceiptsForm } from "../../index.js";
import { useEffect, useState } from "react";
import { RentReceipt } from "../../index.js";
import { axiosDB } from "../../../utils/axios.js";
import {InputSelect} from "../../../UI/index.js";

const Rents = ({ unit }) => {

	const [rentReceipts, setRentReceipts] = useState([]);

	const date = new Date()
	const [year, setYear] = useState(date.toLocaleString('en-us',{ year:'numeric' }))
	const [tenant, setTenant] = useState(null)

	useEffect(() => {
		const fetchTenantData = async () => {
			try {
				const response1 = await axiosDB(`/auth/getUserInfo/${unit}`)
				const { userInfo } = response1.data
				const response2 = await axiosDB(`/finance/rent/${userInfo.id}/${year}`)
				const { rentReceipts } = response2.data
				const updatedReceipts = rentReceipts.map(receipt => {
					return {
						...receipt,
						...userInfo
					}
				})
				setTenant(userInfo)
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
			<SearchRentReceiptsForm tenant={tenant} setRentReceipts={setRentReceipts}/>

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