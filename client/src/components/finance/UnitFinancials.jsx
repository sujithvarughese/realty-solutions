import classes from "./styles/UnitFinancials.module.css";
import { Card } from "../../UI/index.js";
import {
	EditFinancialsForm,
	EditUnitForm,
	CalculatePayoffForm,
	CalculateMonthlyPaymentForm,
	CalculateProfitForm,
} from "../index.js";
import { useEffect, useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import {useLoaderData, useParams} from "react-router-dom";

const UnitFinancials = () => {

	const unitFinancials = useLoaderData()
	const [finances, setFinances] = useState(unitFinancials)
	const [payoffAmount, setPayoffAmount] = useState("")
	const [monthlyPayment, setMonthlyPayment] = useState("")
	const [profit, setProfit] = useState("")


	// { purchasePrice, rent, fairMarketRent, propertyTax, insurance, mortgage, hoa } = finances
	// { company, agent, phone, email, payment, coverage } = insurance
	// { bank, principal, interest, term, paymentsMade, payment } = mortgage
	// { company, agent, phone, email, payment } = hoa

	return (
		<div className={classes.container}>
		<Card>

			<div className={classes.content}>
				<table className={classes.table}>
					<thead className={classes.thead}>
					<tr className={classes.tr}>
						<th className={classes.th}>
							Financial Overview
						</th>
					</tr>
					</thead>
					<tbody>
					<tr className={classes.tr}>
						<td className={classes.td}>Purchase Price</td>
						<td className={classes.td}>{finances?.purchasePrice}</td>
					</tr>
					<tr className={classes.tr}>
						<td className={classes.td}>Rent</td>
						<td className={classes.td}>{finances?.rent}</td>
					</tr>
					<tr className={classes.tr}>
						<td className={classes.td}>Fair Market Rent</td>
						<td className={classes.td}>{finances?.fairMarketRent}</td>
					</tr>
					</tbody>
				</table>


				<div className={classes.details}>
					<table className={classes.table}>
						<thead className={classes.thead}>
						<tr className={classes.tr}>
							<th className={classes.th}>
								Mortgage Information
							</th>
						</tr>
						</thead>
						<tbody>
						<tr className={classes.tr}>
							<td className={classes.td}>Bank</td>
							<td className={classes.td}>{finances?.mortgage.bank}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Loan Amount</td>
							<td className={classes.td}>{finances?.mortgage.principal}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Interest</td>
							<td className={classes.td}>{finances?.mortgage.interest}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Term</td>
							<td className={classes.td}>{finances?.mortgage.term}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Payments Made</td>
							<td className={classes.td}>{finances?.mortgage.paymentsMade}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Monthly Payment</td>
							<td className={classes.td}>{finances?.mortgage.payment}</td>
						</tr>

						</tbody>
					</table>


					<table className={classes.table}>
						<thead className={classes.thead}>
						<tr className={classes.tr}>
							<th className={classes.th}>
								Insurance Information
							</th>
						</tr>
						</thead>
						<tbody>
						<tr className={classes.tr}>
							<td className={classes.td}>Company</td>
							<td className={classes.td}>{finances?.insurance.company}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Agent</td>
							<td className={classes.td}>{finances?.insurance.agent}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Phone</td>
							<td className={classes.td}>{finances?.insurance.phone}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Email</td>
							<td className={classes.td}>{finances?.insurance.email}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Payment</td>
							<td className={classes.td}>{finances?.insurance.payment}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Coverage</td>
							<td className={classes.td}>{finances?.insurance.coverage}</td>
						</tr>
						</tbody>
					</table>

					<table className={classes.table}>
						<thead className={classes.thead}>
						<tr className={classes.tr}>
							<th className={classes.th}>
								Home Owner's Association Information
							</th>
						</tr>
						</thead>
						<tbody>
						<tr className={classes.tr}>
							<td className={classes.td}>Company</td>
							<td className={classes.td}>{finances?.hoa.company}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Agent</td>
							<td className={classes.td}>{finances?.hoa.agent}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Phone</td>
							<td className={classes.td}>{finances?.hoa.phone}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Email</td>
							<td className={classes.td}>{finances?.hoa.email}</td>
						</tr>
						<tr className={classes.tr}>
							<td className={classes.td}>Payment</td>
							<td className={classes.td}>{finances?.hoa.payment}</td>
						</tr>

						</tbody>
					</table>
				</div>
			</div>

			<div className={classes.calcPayoff}>
				<CalculatePayoffForm
					principal={finances?.mortgage.principal}
					apr={finances?.mortgage.interest}
					termYears={finances?.mortgage.term}
					paymentsMade={finances?.mortgage.paymentsMade}
					setPayoffAmount={setPayoffAmount}
				/>
				{ payoffAmount }
			</div>

			<div className={classes.calcPayment}>
				<CalculateMonthlyPaymentForm
					principal={finances?.mortgage.principal}
					apr={finances?.mortgage.interest}
					termYears={finances?.mortgage.term}
					setMonthlyPayment={setMonthlyPayment}
				/>
				{ monthlyPayment }
			</div>

			<div className={classes.calcProfit}>
				<CalculateProfitForm
					propertyTax={finances.propertyTax}
					homeInsurance={finances.insurance.payment}
					hoa={finances.hoa.payment}
					rent={finances.rent}
					setProfit={setProfit}
				/>
				{ profit }
			</div>

		</Card>
		</div>
	);
};

export const unitFinancialsLoader = async ({ params }) => {
	try {
		const response = await axiosDB(`/finance/${params.id}`)
		const { unitFinances } = response.data
		return unitFinances
	} catch (error) {
		console.log(error);
	}
}

export default UnitFinancials;