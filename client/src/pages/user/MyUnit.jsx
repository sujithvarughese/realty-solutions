import classes from "./styles/MyUnit.module.css";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { useEffect } from "react";
import { Button } from "../../UI/index.js";

// homepage for tenant(user)
const MyUnit = () => {
	const myUnit = useLoaderData()
	const { date, setDate, user } = useGlobalContext()

	const { unitID, street, city, state, zip, image } = myUnit

	const { lastName, firstName, rent, balance } = user

	useEffect(() => {
		setDate()
	}, [])

	return (
		<div className={classes.container}>
			{
				date.date >= 5 &&
				<div className={classes.reminder}>
					Reminder: Rent is due on the 1st!
				</div>
			}
			<div className={classes.imageContainer}>
				<img src={image} alt="img" className={classes.image}/>
			</div>

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
		console.log(myUnit);
		return myUnit
	} catch (error) {
		throw new Error(error)
	}
}

export default MyUnit;