import classes from "./styles/UnitFinancials.module.css";
import {
	FinancialsOverview,
	MortgageDetails,
	InsuranceDetails,
	HoaDetails,
	Rents
} from "../../components/index.js";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import {useLoaderData, useLocation} from "react-router-dom";


const UnitFinancials = () => {

	const location = useLocation()
	const { state } = location

	const unitFinancials = useLoaderData()
	const [display, setDisplay] = useState("overview")

	const { unit, purchasePrice, rent, propertyTax, fairMarketRent, insurance, mortgage, hoa } = unitFinancials
	// { company, agent, phone, email, payment, coverage } = insurance
	// { bank, principal, interest, term, paymentsMade, payment } = mortgage
	// { company, agent, phone, email, payment } = hoa


	return (
		<div className={classes.container}>

			<div className={classes.links}>
				<div
					className={display === "overview" ? classes.active : classes.link}
					onClick={()=>setDisplay("overview")}
				>
					Overview
				</div>
				<div
					className={display === "mortgage" ? classes.active : classes.link}
					onClick={()=>setDisplay("mortgage")}
				>
					Mortgage
				</div>
				<div
					className={display === "insurance" ? classes.active : classes.link}
					onClick={()=>setDisplay("insurance")}
				>
					Insurance
				</div>
				<div
					className={display === "hoa" ? classes.active : classes.link}
					onClick={()=>setDisplay("hoa")}
				>
					HOA
				</div>
				<div
					className={display === "rents" ? classes.active : classes.link}
					onClick={()=>setDisplay("rents")}
				>
					Rents
				</div>
			</div>

			<div className={classes.unit}>
				{state.unitID} {state.street}
			</div>

			<div className={classes.forms}>
				{
					display === "overview" &&
					<FinancialsOverview
						purchasePrice={purchasePrice}
						rent={rent}
						fairMarketRent={fairMarketRent}
						propertyTax={propertyTax}
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
				{
					display === "rents" &&
					<Rents
						unitID={state.unitID}
						street={state.street}
						city={state.city}
						state={state.state}
						zip={state.zip}
						lastName={state.tenant.lastName}
						firstName={state.tenant.firstName}
						user={state.user}
					/>
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