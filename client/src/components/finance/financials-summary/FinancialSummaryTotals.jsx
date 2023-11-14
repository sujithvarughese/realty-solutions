import classes from "../../../pages/accounting/styles/FinancialSummary.module.css";
import  { totalMortgage, totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../../utils/financeCalcs.js";

const FinancialSummaryTotals = ({ unitFinances, term }) => {

    return (
        <tr>
            <td></td>
            <td className={classes.totals}>
                {convertToUSD(totalMortgage(unitFinances, term))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalPropertyTax(unitFinances, term))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalInsurance(unitFinances, term))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalHoa(unitFinances, term))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalRent(unitFinances, term))}
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