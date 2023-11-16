import classes from "./styles/FinancialSummary.module.css";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { FinancialSummaryTotals, FinancialSummaryValues, FinancialSummaryMobile } from "../../components/index.js"
import { InputSelect } from "../../UI/index.js";
import { totalProfit, convertToUSD } from "../../utils/financeCalcs.js";

const FinancialSummary = () => {

	// finances = array of each unit's financial data
	const finances = useLoaderData()
	const { units } = useGlobalContext()

	// allow users to view summary per month or year
	const [selectedTerm, setSelectedTerm] = useState(1)

	// filter array we receive in loader to include address from {units} and only relevant data
	const [unitFinances, setUnitFinances] = useState(finances.map(finance => {
		const unit = units.find(unitInArray => unitInArray._id === finance.unit)
		return {
			unitID: finance.unit,
			financeID: finance._id,
			mortgage: finance.mortgage,
			propertyTax: finance.annualPropertyTax/12,
			insurance: finance.insurance.annualPremium/12,
			hoa: finance.hoa.annualFee/12,
			rent: finance.rent,
			houseNumber: unit.houseNumber,
			street: unit.street,
			apartmentNumber: unit.apartmentNumber,
			city: unit.city,
			state: unit.state,
			zip: unit.zip,
			tenant: unit.tenant,
			user: unit.user
		}
	}))

	// user can remove unit using state to see potential changes in finances
	const removeUnit = (unitID) => {
		const updatedList = unitFinances.filter(unitFinance => unitFinance.financeID !== unitID)
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
					onChange={(e)=>setSelectedTerm(e.target.value)}
				>

				</InputSelect>
			</div>

			<div className={classes.mobile}>
				<FinancialSummaryMobile unitFinances={unitFinances} selectedTerm={selectedTerm} removeUnit={removeUnit}/>
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
							key={unitFinance.financeID}
							unitFinance={unitFinance}
							selectedTerm={selectedTerm}
							removeUnit={removeUnit}
						/>)
				}
				<FinancialSummaryTotals unitFinances={unitFinances} selectedTerm={selectedTerm}/>

				</tbody>
			</table>
			<div className={classes.totalProfit}>
				Total Profit: {convertToUSD(totalProfit(unitFinances, selectedTerm))}
			</div>
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