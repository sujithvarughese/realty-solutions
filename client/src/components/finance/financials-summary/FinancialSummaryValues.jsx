import classes from "../../../pages/accounting/styles/FinancialSummary.module.css";
import {IoRemoveCircle} from "react-icons/io5";
import { calculateMonthlyPayment} from "../../../utils/financeCalcs.js";
import {NavLink} from "react-router-dom";

const FinancialSummaryValues = ({ unitFinance, term, removeUnit }) => {

    const { unit } = unitFinance
    const { principal, interest, term: mortgageTerm } = unitFinance.mortgage
    return (
        <tr className={classes.tr}>
            <td>
                <div className={classes.addressCol}>
                    <div
                        className={classes.remove}
                        onClick={()=>removeUnit(unitFinance.id)}
                    >
                        <IoRemoveCircle />
                    </div>

                    <NavLink
                        to={`${unit}`}
                        className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
                    >
                        <div className={classes.address}>
                            {unitFinance.address}
                        </div>
                    </NavLink>

                </div>


            </td>
            <td>
                {convertToUSD((calculateMonthlyPayment(principal, interest, mortgageTerm)) * term)}
            </td>
            <td>
                {convertToUSD(unitFinance.propertyTax * term)}
            </td>
            <td>
                {convertToUSD(unitFinance.insurance * term)}
            </td>
            <td>
                {convertToUSD(unitFinance.hoa * term)}
            </td>
            <td>
                {convertToUSD(unitFinance.rent * term)}
            </td>
        </tr>
    );
};

const convertToUSD = (number) => {
    return  number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}
export default FinancialSummaryValues;