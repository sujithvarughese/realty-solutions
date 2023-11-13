import classes from "./styles/FinancialSummary.module.css";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { FinancialSummaryTotals } from "../"
import { IoRemoveCircle } from "react-icons/io5"
const FinancialSummary = () => {

	// finances = array of each unit's financial data
	const finances = useLoaderData()
	const { units } = useGlobalContext()

	// filter array we receive in loader to include address from {units} and only relevant data
	const [unitFinances, setUnitFinances] = useState(finances.map(finance => {
		const index = units.findIndex(unit => unit._id === finance.unit)
		return {
			id: finance._id,
			propertyTax: finance.propertyTax,
			insurance: finance.insurance.payment,
			hoa: finance.hoa.payment,
			rent: finance.rent,
			address: `${units[index].unitID} ${units[index].street}`
		}
	}))

	const removeUnit = (id) => {
		console.log(id)
		const updatedList = unitFinances.filter(unitFinance => unitFinance.id !== id)
		setUnitFinances(updatedList)
	}

	return (
		<div>
			<table className={classes.table}>
				<thead className={classes.thead}>
					<tr className={classes.tr}>
						<th></th>
						<th className={classes.th}>
							Address
						</th>
						<th className={classes.th}>
							Yearly Property Tax
						</th>
						<th className={classes.th}>
							Yearly Insurance Premium
						</th>
						<th className={classes.th}>
							Monthly HOA
						</th>
						<th className={classes.th}>
							Monthly Rent
						</th>
					</tr>
				</thead>

				<tbody className={classes.tbody}>
				{
					unitFinances.map(unitFinance => {
						return (
							<tr className={classes.tr} key={unitFinance.id}>
								<td onClick={()=>removeUnit(unitFinance.id)}>
									<IoRemoveCircle />
								</td>
								<td className={classes.td}>
									{unitFinance.address}
								</td>
								<td className={classes.td}>
									{unitFinance.propertyTax}
								</td>
								<td className={classes.td}>
									{unitFinance.insurance}
								</td>
								<td className={classes.td}>
									{unitFinance.hoa}
								</td>
								<td className={classes.td}>
									{unitFinance.rent}
								</td>
							</tr>
						)
					})
				}
				<FinancialSummaryTotals unitFinances={unitFinances} />

				</tbody>
			</table>
		</div>
	);
};

export const financialSummaryLoader = async () => {
	try {
		const response = await axiosDB("/finance")
		const { finances } = response.data
		return finances
	} catch (error) {
		console.log(error);
	}
}

export default FinancialSummary;