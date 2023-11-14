import classes from "./styles/RentReceipt.module.css"
import { useGlobalContext } from "../../../context/GlobalContext.jsx";


const RentReceipt = (rentReceipt) => {
	const { month, year, date, amountPaid, balance } = rentReceipt
	const { user } = useGlobalContext()

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
						{user.firstName} {user.lastName}
					</div>
				</div>

				<div className={classes.addressContainer}>
					<div>
						Property Address:
					</div>
					<div className={classes.address}>
						<div>
							{user.unitID} {user.street}
						</div>
						<div>
							{user.city}, {user.state} {user.zip}
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
						Amount Paid:
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