import classes from "./styles/FinancialSummary.module.css";
import {IoRemoveCircle} from "react-icons/io5";
import { calculateMonthlyPayment} from "../../../utils/financeCalcs.js";

const FinancialSummaryValues = ({ unitFinance, term, removeUnit }) => {

    const { principal, interest, term: mortgageTerm } = unitFinance.mortgage

    return (
        <tr className={classes.tr}>
            <td onClick={()=>removeUnit(unitFinance.id)}>
                <IoRemoveCircle />
            </td>
            <td>
                {unitFinance.address}
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