import classes from "./styles/UnitFinancials.module.css";
import { Button, Card } from "../../UI/index.js";
import { EditFinancialsForm, EditUnitForm } from "../index.js";
import { useState } from "react";


const UnitFinancials = ({ unit }) => {

	const { unitID, street, city, state, zip, image, occupied, bedrooms, bathrooms, fairMarketRent } = unit

	const [showEditFinancialsForm, setShowEditFinancialsForm] = useState(false)

	return (
		<div className={classes.container}>
			<Card>
				<div className={classes.content}>
					<img src={image} alt="img" className={classes.image}/>

					<div className={classes.info}>
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
							<div>
								{bedrooms}-br / {bathrooms}-bath
							</div>
							<div>
								{!occupied && "Vacant"}
							</div>
						</div>
					</div>

					<div className={classes.mobileContact}>
						<div className={classes.button}>

						</div>
						<div className={classes.button}>

						</div>
					</div>

					<div className={classes.details}>

					</div>


					<div className={classes.actions}>
						<div
							className={classes.link}
							onClick={() => setShowEditFinancialsForm(prevState => !prevState)}
						>
							Edit Financials
						</div>
					</div>
				</div>

				<div className={classes.forms}>
					{/* forms open when state toggled */}
					{ showEditFinancialsForm && <EditFinancialsForm unit={unit}/>}

				</div>
			</Card>
		</div>
	);
};

export default UnitFinancials;