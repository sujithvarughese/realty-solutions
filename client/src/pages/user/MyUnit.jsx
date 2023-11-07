import classes from "./styles/MyUnit.module.css";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";

// homepage for tenant(user)
const MyUnit = () => {
	const myUnit = useLoaderData()

	const { unitID, street, city, state, zip, image, user } = myUnit
	const { lastName, firstName, rent, balance } = user
	console.log(myUnit)
	return (
		<div className={classes.unit}>

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