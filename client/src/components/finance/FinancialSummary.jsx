import classes from "./styles/FinancialSummary.module.css";
import { useEffect, useState } from "react";
import { axiosDB } from "../../utils/axios.js";

const FinancialSummary = () => {



	return (
		<div>
			Summary of financial data for all units:
			total income,
			total profit
			total expense
		</div>
	);
};

export default FinancialSummary;