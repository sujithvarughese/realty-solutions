import classes from "./styles/MyUnit.module.css";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect } from "react";
import { Button } from "../../UI/index.js";

// homepage for tenant(user)
const MyUnit = () => {
	const myUnit = useLoaderData()
	const { date, setDate, setUser } = useGlobalContext()

	const { unitID, street, city, state, zip, image, user } = myUnit

	const { lastName, firstName, rent, balance } = user

	useEffect(() => {
		setDate()
		setUser({ lastName, firstName, unitID, street, city, state, zip})
	}, [])

	return (
		<div className={classes.unit}>
			{
				date.date >= 5 &&
				<div>
					Reminder: Rent is due on the 1st!
				</div>
			}
			<img src={image} alt="img" className={classes.image}/>


			<div className={classes.address}>
				<div className={classes.addressLine1}>
					<span>{unitID} </span>
					<span>{street}</span>
				</div>
				<div className={classes.addressLine2}>
					<span>{city}, </span>
					<span>{state} </span>
					<span>{zip}</span>
				</div>
			</div>

			<div className={classes.name}>
				{firstName} {lastName}
			</div>

			<div className={classes.finance}>
				<div className={classes.rent}>
					Rent: {rent}/mo
				</div>
				<div className={classes.balance}>
					Balance: {balance}
				</div>
			</div>

			<div className={classes.paymentHistory}>

			</div>
		</div>
	);
};

export const myUnitLoader = async () => {
	try {
		const response = await axiosDB("/units/myUnit")
		const { myUnit } = response.data
		return myUnit
	} catch (error) {
		throw new Error(error)
	}
}

export default MyUnit;