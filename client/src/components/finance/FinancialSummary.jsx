import classes from "./styles/FinancialSummary.module.css";
import { useEffect, useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";

const FinancialSummary = () => {

	const finances = useLoaderData()
	console.log(finances);
	return (
		<div>
			Summary of financial data for all units:
			total income,
			total profit
			total expense
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