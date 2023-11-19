import classes from "./styles/MyUnit.module.css";
import { axiosDB } from "../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { convertToUSD } from "../utils/financeCalcs.js";

// homepage for tenant(user)
const MyUnit = () => {
	const myUnit = useLoaderData()
	const { user } = useGlobalContext()

	const { houseNumber, street, apartmentNumber, city, state, zip, image } = myUnit

	const { lastName, firstName, rent, balance } = user

	return (
		<div className={classes.container}>

			<div className={classes.imageContainer}>
				<img src={image} alt="img" className={classes.image}/>
			</div>

			<div className={classes.address}>
				<div className={classes.addressLine1}>
					<span>{houseNumber} </span>
					<span>{street} </span>
					<span>{apartmentNumber} </span>
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
					Rent: {convertToUSD(rent)}
				</div>
				<div className={classes.balance}>
					Balance: {convertToUSD(balance)}
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