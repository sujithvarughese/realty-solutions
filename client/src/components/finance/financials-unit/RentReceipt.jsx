import classes from "./styles/RentReceipt.module.css"
import {useEffect, useState} from "react";
import {axiosDB} from "../../../utils/axios.js";

const RentReceipt = ({ month, year, date, amountPaid, balance, unitID, street, city, state, zip, lastName, firstName, user }) => {

	const [userData, setUserData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosDB(`/auth/getUserInfo/${user}`)
				const { userInfo } = response.data
				setUserData(userInfo)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [])

	return (
		<div className={classes.rentReceipt}>

			<div className={classes.title}>
				Rent Receipt
			</div>

			<div className={classes.dateContainer}>
				<div>
					Date of Payment:
				</div>
				<div className={classes.value}>
					{date}
				</div>
			</div>

			<div className={classes.col1}>
				<div className={classes.nameContainer}>
					Received From:
					<div className={classes.name}>
						{firstName} {lastName}
					</div>
				</div>

				<div className={classes.addressContainer}>
					<div className={classes.address}>
						<div>
							{unitID} {street}
						</div>
						<div>
							{city}, {state} {zip}
						</div>
					</div>
				</div>

				<div className={classes.monthYear}>
					<div>
						Rental Period:
					</div>
					<div>
						{month} {year}
					</div>
				</div>
			</div>

			<div className={classes.col2}>

				<div className={classes.amountContainer}>
					<div>
						Paid:
					</div>
					<div>
						{amountPaid}
					</div>
				</div>

				<div className={classes.balanceContainer}>
					<div>
						Balance:
					</div>
					<div>
						{balance}
					</div>
				</div>

				<div className={classes.signature}>
					Landlord's Signature
				</div>
			</div>






		</div>
	);
};

export default RentReceipt;