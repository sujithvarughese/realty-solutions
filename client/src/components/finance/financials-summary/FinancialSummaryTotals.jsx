import classes from "../../../pages/accounting/styles/Accounting.module.css";
import  { totalMortgage, totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../../utils/financeCalcs.js";
import { convertToUSD } from "../../../utils/financeCalcs.js";

const FinancialSummaryTotals = ({ unitFinances, selectedTerm }) => {

    return (
        <tr>
            <td></td>
            <td className={classes.totals}>
                {convertToUSD(totalMortgage(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalPropertyTax(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalInsurance(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalHoa(unitFinances, selectedTerm))}
            </td>
            <td className={classes.totals}>
                {convertToUSD(totalRent(unitFinances, selectedTerm))}
            </td>
        </tr>
    );
};


export default FinancialSummaryTotals;