import classes from "./styles/FinanceUnitDetails.module.css";
import { CreateRentReceiptForm, SearchRentReceiptsForm } from "../../index.js";
import { useEffect, useState } from "react";
import { RentReceipt } from "../../index.js";
import { axiosDB } from "../../../utils/axios.js";
import {convertToUSD} from "../../../utils/financeCalcs.js";
import FinanceDetailsRow from "./FinanceDetailsRow.jsx";
import {Input} from "../../../ui/index.js";


const RentDetails = ({ houseNumber, street, apartmentNumber, city, state, zip, firstName, lastName, userID, rent }) => {

	const [rentReceipts, setRentReceipts] = useState([]);

	const date = new Date()
	const [year, setYear] = useState(date.toLocaleString('en-us',{ year:'numeric' }))

	useEffect(() => {
		const fetchRentReceipts = async () => {
			try {
				const response = await axiosDB(`/finance/rent/${userID}/${year}`)
				const { rentReceipts } = response.data
				const updatedReceipts = rentReceipts.map(receipt => {
					return {
						...receipt,
						houseNumber,
						street,
						apartmentNumber,
						city,
						state,
						zip,
						lastName,
						firstName,
					}
				})
				setRentReceipts(updatedReceipts)
			} catch (error) {
				console.log(error)
			}
		}
		fetchRentReceipts()
	}, []);



	return (
		<div className={classes.container}>

			<div className={classes.head}>
				Rent Receipts
			</div>
			<div className={classes.body}>
				{
					rent &&
					<FinanceDetailsRow
						label="Monthly Rent"
						display={convertToUSD(rent)}
					/>
				}
			</div>

			<div className={classes.rentForms}>
				<CreateRentReceiptForm
					userID={userID}
					lastName={lastName}
					firstName={firstName}
					houseNumber={houseNumber}
					street={street}
					apartmentNumber={apartmentNumber}
					city={city}
					state={state}
					zip={zip}
				/>
				<SearchRentReceiptsForm userID={userID} setRentReceipts={setRentReceipts}/>
			</div>


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


export default RentDetails;