import classes from "./styles/Financials.module.css";
import { useEffect, useState } from "react";
import { axiosDB } from "../../utils/axios.js";

const Financials = ({ unit }) => {

	const [finances, setFinances] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosDB(`/finance/${unit}`)
				const { unitFinancials } = response.data
				setFinances(unitFinancials)
			} catch (error) {
				console.log(error);
			}
		}
		fetchData()
	})

	return (
		<div>
			Mortgages by Unit:
			-list of units with each mortgage including balance, total principal, interest, etc-

			Rents by unit - including total rent amount
		</div>
	);
};

export default Financials;