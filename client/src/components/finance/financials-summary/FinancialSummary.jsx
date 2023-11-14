import classes from "./styles/FinancialSummary.module.css";
import { useState } from "react";
import { axiosDB } from "../../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext.jsx";
import {FinancialSummaryTotals, FinancialSummaryValues} from "../../index.js"
import { IoRemoveCircle } from "react-icons/io5"
import {InputSelect} from "../../../UI/index.js";
const FinancialSummary = () => {

	// finances = array of each unit's financial data
	const finances = useLoaderData()
	const { units } = useGlobalContext()

	// allow users to view summary per month or year
	const [term, setTerm] = useState(1)

	// filter array we receive in loader to include address from {units} and only relevant data
	const [unitFinances, setUnitFinances] = useState(finances.map(finance => {
		const index = units.findIndex(unit => unit._id === finance.unit)
		return {
			id: finance._id,
			mortgage: finance.mortgage,
			propertyTax: finance.propertyTax/12,
			insurance: finance.insurance.payment/12,
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
			<div>
				<InputSelect
					htmlFor="term"
					label="Term: "
					type="text"
					name="term"
					list={[{text: "monthly", value: 1}, {text: "yearly", value: 12}]}
					onChange={(e)=>setTerm(e.target.value)}
				>

				</InputSelect>
			</div>

			<table className={classes.table}>
				<thead className={classes.thead}>
					<tr className={classes.tr}>
						<th></th>
						<th className={classes.th}>
							Address
						</th>
						<th className={classes.th}>
							Mortgage
						</th>
						<th className={classes.th}>
							Tax
						</th>
						<th className={classes.th}>
							Insurance
						</th>
						<th className={classes.th}>
							HOA
						</th>
						<th className={classes.th}>
							Rent
						</th>
					</tr>
				</thead>

				<tbody className={classes.tbody}>
				{
					unitFinances.map(unitFinance =>
						<FinancialSummaryValues
							key={unitFinance.id}
							unitFinance={unitFinance}
							term={term}
							removeUnit={removeUnit}
						/>)
				}
				<FinancialSummaryTotals unitFinances={unitFinances} term={term}/>

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