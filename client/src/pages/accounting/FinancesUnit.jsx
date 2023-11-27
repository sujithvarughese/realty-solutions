import classes from "./styles/FinancesUnit.module.css";
import {
	FinanceDetails,
	MortgageDetails,
	InsuranceDetails,
	HoaDetails,
	RentDetails
} from "../../components/index.js";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import {useLoaderData, useLocation} from "react-router-dom";

const FinancesUnit = () => {

	const location = useLocation()
	const { state } = location

	const unitFinance = useLoaderData()
	const [display, setDisplay] = useState("overview")

	const [financeState, setFinanceState] = useState(unitFinance)

	// { _id, purchasePrice, rent, annualPropertyTax, fairMarketRent, insurance, mortgage, hoa } = unitFinance
	// { company, agent, phone, email, annualPremium, coverage } = insurance
	// { bank, principal, interest, term, paymentsMade } = mortgage
	// { company, agent, phone, email, annualFee } = hoa

	const updateUnitFinance = async (values) => {
		try {
			await axiosDB.patch("/finance", { id: unitFinance._id, values })
			setFinanceState({ ...financeState, ...values })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.links}>
				<div
					className={`${classes.link} ${display === "overview" && classes.active}`}
					onClick={()=>setDisplay("overview")}
				>
					Overview
				</div>
				<div
					className={`${classes.link} ${display === "mortgage" && classes.active}`}
					onClick={()=>setDisplay("mortgage")}
				>
					Mortgage
				</div>
				<div
					className={`${classes.link} ${display === "insurance" && classes.active}`}
					onClick={()=>setDisplay("insurance")}
				>
					Insurance
				</div>
				<div
					className={`${classes.link} ${display === "hoa" && classes.active}`}
					onClick={()=>setDisplay("hoa")}
				>
					HOA
				</div>
				<div
					className={`${classes.link} ${display === "rents" && classes.active}`}
					onClick={()=>setDisplay("rents")}
				>
					Rents
				</div>
			</div>

			<div className={classes.unit}>
				{state.houseNumber} {state.street} {state.apartmentNumber}
			</div>

			<div className={classes.content}>
				<div className={classes.forms}>
					{
						display === "overview" &&
						<FinanceDetails
							updateUnitFinance={updateUnitFinance}
							purchasePrice={financeState.purchasePrice}
							rent={financeState.rent}
							fairMarketRent={financeState.fairMarketRent}
							annualPropertyTax={financeState.annualPropertyTax}
							annualInsurancePremium={financeState.insurance.annualPremium}
							annualHoa={financeState.hoa.annualFee}
						/>
					}
					{
						display === "mortgage" &&
						<MortgageDetails updateUnitFinance={updateUnitFinance} mortgage={financeState.mortgage}/>
					}
					{
						display === "insurance" &&
						<InsuranceDetails updateUnitFinance={updateUnitFinance} insurance={financeState.insurance} />
					}
					{
						display === "hoa" &&
						<HoaDetails updateUnitFinance={updateUnitFinance} hoa={financeState.hoa} />
					}
					{
						display === "rents" &&
						<RentDetails
							houseNumber={state.houseNumber}
							street={state.street}
							apartmentNumber={state.apartmentNumber}
							city={state.city}
							state={state.state}
							zip={state.zip}
							lastName={state.tenant.lastName}
							firstName={state.tenant.firstName}
							userID={state.user}
							rent={financeState.rent}
						/>
					}
				</div>
			</div>

		</div>
	);
};

export const unitFinancialsLoader = async ({ params }) => {
	try {
		const response = await axiosDB(`/finance/${params.id}`)
		const { unitFinance } = response.data
		return unitFinance
	} catch (error) {
		console.log(error);
	}
}

export default FinancesUnit;