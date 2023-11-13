import classes from "./styles/FinancialSummaryTotals.module.css";
import  { totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../utils/financeCalcs.js";
const FinancialSummaryTotals = ({ unitFinances, term }) => {

    return (
        <tr className={classes.tr}>
            <td className={classes.td}>
                Totals:
            </td>
            <td></td>
            <td className={classes.td}>
                { totalPropertyTax(unitFinances, term) }
            </td>
            <td className={classes.td}>
                { totalInsurance(unitFinances, term) }
            </td>
            <td className={classes.td}>
                { totalRent(unitFinances, term) }
            </td>
            <td className={classes.td}>
                { totalHoa(unitFinances, term) }
            </td>
            <td>
                Total:
            </td>
        </tr>
    );
};

export default FinancialSummaryTotals;