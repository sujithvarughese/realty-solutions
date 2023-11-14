import classes from "./styles/FinancialSummary.module.css";
import {useEffect, useState} from "react";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import {FinancialSummaryTotals, FinancialSummaryValues, FinancialSummaryMobile } from "../../components/index.js"
import {InputSelect} from "../../UI/index.js";
import {totalProfit} from "../../utils/financeCalcs.js";
const FinancialSummary = () => {

	// finances = array of each unit's financial data
	const finances = useLoaderData()
	const { units } = useGlobalContext()

	// allow users to view summary per month or year
	const [term, setTerm] = useState(1)

	// filter array we receive in loader to include address from {units} and only relevant data
	const [unitFinances, setUnitFinances] = useState(finances.map(finance => {
		const index = units?.findIndex(unit => unit._id === finance.unit)
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
		<div className={classes.container}>

			<div className={classes.title}>
				Accounting Totals
			</div>

			<div className={classes.termSelect}>
				<InputSelect
					htmlFor="term"
					label="Term: "
					type="text"
					name="term"
					list={[{text: "Monthly", value: 1}, {text: "Yearly", value: 12}]}
					onChange={(e)=>setTerm(e.target.value)}
				>

				</InputSelect>
			</div>

			<div className={classes.mobile}>
				<FinancialSummaryMobile units={units} unitFinances={unitFinances} term={term} removeUnit={removeUnit}/>
			</div>

			<table className={classes.largeScreen}>
				<thead>
					<tr>
						<th>Address</th>
						<th>Mortgage</th>
						<th>Tax</th>
						<th>Insurance</th>
						<th>HOA</th>
						<th>Rent</th>
					</tr>
				</thead>

				<tbody>
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
			<div className={classes.totalProfit}>
				Total Profit: {convertToUSD(totalProfit(unitFinances, term))}
			</div>
		</div>
	);
};

const convertToUSD = (number) => {
	return  number.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	})
}
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