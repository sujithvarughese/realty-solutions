import classes from "./styles/Units.module.css";
import { CreateUnitForm } from "../../components/index.js";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "../../UI/index.js";
import { axiosDB } from "../../utils/axios.js";
import { Unit } from "../../components";

const Units = () => {
	// units = [{ unit }, {},...]
	const units = useLoaderData()

	// will open up form
	const [showCreateUnitForm, setShowCreateUnitForm] = useState(false)

	return (
		<div className={classes.unitsPage}>

			<div className={classes.button}>
				<Button
					onClick={()=>setShowCreateUnitForm(true)}
				>Create Unit</Button>
			</div>

			{
				// pass setState function as cancel to hide form if desired
				showCreateUnitForm && <CreateUnitForm cancel={()=>setShowCreateUnitForm(false)}/>
			}

			<div className={classes.unitContainer}>
			{
				units.length > 0
				&&
				units.map(unit => <Unit key={unit.unitID} unit={unit}/>)
			}
			</div>
		</div>
	);
};

export const unitsLoader = async () => {
	try {
		const response = await axiosDB("/units")
		const { units } = response.data
		return units
	} catch (error) {
		throw new Error(error)
	}
}

export default Units;