import classes from "./styles/UnitFinancials.module.css";
import { Button, Card } from "../../UI/index.js";
import { EditFinancialsForm, EditUnitForm } from "../index.js";
import { useEffect, useState } from "react";
import { axiosDB } from "../../utils/axios.js";


const UnitFinancials = ({ close, unit }) => {

	const { unitID, street, city, state, zip, image, occupied, bedrooms, bathrooms, fairMarketRent } = unit
	const [finances, setFinances] = useState(null)
	const [showEditFinancialsForm, setShowEditFinancialsForm] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosDB(`/finance/${unit._id}`)
				const { unitFinances } = response.data
				setFinances(unitFinances)
			} catch (error) {
				console.log(error);
			}
		}
		fetchData()
	}, [])

	return (
		<div className={classes.container}>
			<Card>
				<div className={classes.content}>

					<div>
						Purchase Price: {finances?.purchasePrice}
					</div>
					<div>
						Rent: {finances?.rent}
					</div>
					<div>
						Fair Market Rent: {finances?.fairMarketRent}
					</div>
					<div>
						Mortgage Information
					</div>
					<div>
						Bank: {finances?.mortgage.bank}
					</div>
					<div>
						Loan Amount: {finances?.mortgage.loanAmount}
					</div>






					<div className={classes.actions}>
						<div
							className={classes.link}
							onClick={() => setShowEditFinancialsForm(prevState => !prevState)}
						>
							Edit Financials
						</div>
					</div>
				</div>

				<div className={classes.forms}>
					{/* forms open when state toggled */}
					{ showEditFinancialsForm && <EditFinancialsForm unit={unit}/>}

				</div>
			</Card>
		</div>
	);
};

export default UnitFinancials;