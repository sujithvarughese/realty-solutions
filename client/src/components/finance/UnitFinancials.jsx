import classes from "./styles/UnitFinancials.module.css";
import { Button, Card, Form } from "../../UI/index.js";
import { EditFinancialsForm, EditUnitForm } from "../index.js";
import { useEffect, useState } from "react";
import { axiosDB } from "../../utils/axios.js";


const UnitFinancials = ({ close, unit }) => {

	const [finances, setFinances] = useState(null)
	const [showEditFinancialsForm, setShowEditFinancialsForm] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosDB(`/finance/${unit}`)
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

			<div className={classes.actions}>
				<div className={classes.title}>
					Financial Details
				</div>
				<div
					className={classes.link}
					onClick={() => setShowEditFinancialsForm(prevState => !prevState)}
				>
					Edit Financials
				</div>
			</div>

			{
				showEditFinancialsForm ?
					<EditFinancialsForm unit={unit} cancel={()=>setShowEditFinancialsForm(false)}/>
					:
					<div className={classes.table}>
					<table>
						<tbody>
						<tr>
							<td>Purchase Price</td>
							<td>{finances?.purchasePrice}</td>
						</tr>
						<tr>
							<td>Rent</td>
							<td>{finances?.rent}</td>
						</tr>
						<tr>
							<td>Fair Market Rent</td>
							<td>{finances?.fairMarketRent}</td>
						</tr>
						<tr>
							<td>Bank</td>
							<td>{finances?.mortgage.bank}</td>
						</tr>
						<tr>
							<td>Loan Amount</td>
							<td>{finances?.mortgage.loanAmount}</td>
						</tr>
						<tr>
							<td>Balance</td>
							<td>{finances?.balance}</td>
						</tr>
						<tr>
							<td>Interest</td>
							<td>{finances?.mortgage.interest}</td>
						</tr>
						<tr>
							<td>Payment</td>
							<td>{finances?.mortgage.payment}</td>
						</tr>
						</tbody>
					</table>
					</div>
			}




			<div className={classes.forms}>
				{/* forms open when state toggled */}
				{ showEditFinancialsForm && <EditFinancialsForm unit={unit}/>}

			</div>
		</Card>
		</div>
	);
};

export default UnitFinancials;