import classes from "./styles/Units.module.css";
import {useEffect, useState} from "react";
import { useLoaderData } from "react-router-dom";
import { axiosDB } from "../utils/axios.js";
import { Unit, SearchUnits, CreateUnitForm, UnitMobile } from "../components";
import {useGlobalContext} from "../context/GlobalContext.jsx";


const Units = () => {
	// units = [{ unit }, {},...]
	const units = useLoaderData()

	const { setUnits } = useGlobalContext()
	useEffect(() => {
		setUnits(units)
	}, []);


	// will open up form
	const [showCreateUnitForm, setShowCreateUnitForm] = useState(false)

	// state for search function
	const [query, setQuery] = useState("")

	// filter units by search by using derived state;
	// -convert query to lower case and check if any part of the address contains the search
	const queriedUnits = units.filter(unit => {
		return (
			unit.unitID.toLowerCase().includes(query.toLowerCase())  ||
			unit.street.toLowerCase().includes(query.toLowerCase()) ||
			unit.city.toLowerCase().includes(query.toLowerCase()) ||
			unit.state.toLowerCase().includes(query.toLowerCase()) ||
			unit.zip.toLowerCase().includes(query.toLowerCase())
		)
	})

	return (
		<div className={classes.container}>

			<div className={classes.options}>

				{/* Search bar */}
				<div className={classes.search}>
					<SearchUnits query={query} setQuery={setQuery} />
				</div>
				<div
					className={classes.create}
					onClick={()=>setShowCreateUnitForm(true)}
				>
					Create Unit
				</div>
			</div>

			{
				// pass setState function as cancel to hide form if desired
				showCreateUnitForm && <CreateUnitForm cancel={()=>setShowCreateUnitForm(false)}/>
			}

			<div className={classes.unitContainer}>
				<div className={classes.desktop}>
					{
						queriedUnits?.map(unit =><Unit key={unit._id} unit={unit}/>)
					}
				</div>
				<div className={classes.mobile}>
					{
						queriedUnits?.map(unit =><UnitMobile key={unit._id} unit={unit}/>)
					}
				</div>
			</div>

		</div>
	);
};

export const unitsLoader = async () => {
	try {
		// all units
		const response = await axiosDB("/units")
		const { units } = response.data
		return units
	} catch (error) {
		throw new Error(error)
	}
}

export default Units;