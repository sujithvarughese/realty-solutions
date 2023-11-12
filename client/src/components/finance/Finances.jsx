import classes from "./styles/Finances.module.css";
import { EditFinancialsForm, Unit, UnitFinancials } from "./../../components";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

const Finances = () => {

	const { units } = useGlobalContext()

	return (
		<div>
			<div>
				Mortgages by Unit:
				-list of units with each mortgage including balance, total principal, interest, etc-
			</div>

			<div>
				Rents by unit - including total rent amount
			</div>
			<div className={classes.unitContainer}>
				<div>
					{
						units?.map(unit =><UnitFinancials key={unit._id} unit={unit}/>)
					}
				</div>
			</div>

			<EditFinancialsForm units={units}/>


		</div>
	);
};

const calcMortgagePayoff = () => {

}

export default Finances;