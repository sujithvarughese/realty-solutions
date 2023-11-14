import classes from "./styles/FinancialSummaryTotals.module.css";
import  { totalMortgage, totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../../utils/financeCalcs.js";

const FinancialSummaryTotals = ({ unitFinances, term }) => {

    return (
        <tr className={classes.tr}>
            <td className={classes.td}>
                Totals:
            </td>
            <td></td>
            <td className={classes.td}>
                {convertToUSD(totalMortgage(unitFinances, term))}
            </td>
            <td className={classes.td}>
                {convertToUSD(totalPropertyTax(unitFinances, term))}
            </td>
            <td className={classes.td}>
                {convertToUSD(totalInsurance(unitFinances, term))}
            </td>
            <td className={classes.td}>
                {convertToUSD(totalRent(unitFinances, term))}
            </td>
            <td className={classes.td}>
                {convertToUSD(totalHoa(unitFinances, term))}
            </td>
            <td>
                Total: {convertToUSD(totalProfit(unitFinances, term))}
            </td>
        </tr>
    );
};

// function to convert to dollar format
const convertToUSD = (number) => {
    return  number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

export default FinancialSummaryTotals;