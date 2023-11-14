import classes from "./styles/UnitFinancials.module.css";
import { Card } from "../../../UI/index.js";
import {
	FinancialsOverview,
	MortgageDetails,
	InsuranceDetails,
	HoaDetails
} from "../../index.js";
import { useState } from "react";
import { axiosDB } from "../../../utils/axios.js";
import { useLoaderData } from "react-router-dom";

const UnitFinancials = () => {

	const unitFinancials = useLoaderData()
	const [finances, setFinances] = useState(unitFinancials)

	const [display, setDisplay] = useState("overview")


	const { purchasePrice, rent, fairMarketRent, insurance, mortgage, hoa } = finances
	// { company, agent, phone, email, payment, coverage } = insurance
	// { bank, principal, interest, term, paymentsMade, payment } = mortgage
	// { company, agent, phone, email, payment } = hoa

	return (
		<div className={classes.container}>

			<div className={classes.links}>
				<div className={classes.link} onClick={()=>setDisplay("overview")}>
					Overview
				</div>
				<div className={classes.link} onClick={()=>setDisplay("mortgage")}>
					Mortgage
				</div>
				<div className={classes.link} onClick={()=>setDisplay("insurance")}>
					Insurance
				</div>
				<div className={classes.link} onClick={()=>setDisplay("hoa")}>
					HOA
				</div>
			</div>


			<div className={classes.forms}>
				{
					display === "overview" &&
					<FinancialsOverview
						purchasePrice={purchasePrice}
						rent={rent}
						fairMarketRent={fairMarketRent}
						propertyTax={finances.propertyTax}
						homeInsurance={insurance.payment}
						hoa={hoa.payment}
					/>
				}
				{
					display === "mortgage" && <MortgageDetails mortgage={mortgage}/>
				}
				{
					display === "insurance" && <InsuranceDetails insurance={insurance} />
				}
				{
					display === "hoa" && <HoaDetails hoa={hoa} />
				}
			</div>
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