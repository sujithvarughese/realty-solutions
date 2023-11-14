import classes from "./styles/FinancialSummaryValues.module.css";
import {IoRemoveCircle} from "react-icons/io5";
import { calculateMonthlyPayment} from "../../utils/financeCalcs.js";

const FinancialSummaryValues = ({ unitFinance, term, removeUnit }) => {

    console.log(unitFinance)

    const { principal, interest, term: mortgageTerm } = unitFinance.mortgage

    return (
        <tr className={classes.tr} key={unitFinance.id}>
            <td onClick={()=>removeUnit(unitFinance.id)}>
                <IoRemoveCircle />
            </td>
            <td className={classes.td}>
                {unitFinance.address}
            </td>
            <td className={classes.td}>
                {convertToUSD((calculateMonthlyPayment(principal, interest, mortgageTerm)) * term)}
            </td>
            <td className={classes.td}>
                {convertToUSD(unitFinance.propertyTax * term)}
            </td>
            <td className={classes.td}>
                {convertToUSD(unitFinance.insurance * term)}
            </td>
            <td className={classes.td}>
                {convertToUSD(unitFinance.hoa * term)}
            </td>
            <td className={classes.td}>
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