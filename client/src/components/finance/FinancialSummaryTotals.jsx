import classes from "./styles/FinancialSummaryTotals.module.css";
import  { totalYearlyPropertyTax, totalYearlyInsurance, totalRent, totalMonthlyHoa} from "../../utils/financeCalcs.js";
const FinancialSummaryTotals = ({ unitFinances }) => {

    console.log(unitFinances)

    return (
        <tr className={classes.tr}>
            <td className={classes.td}>
                Totals:
            </td>
            <td></td>
            <td className={classes.td}>
                { totalYearlyPropertyTax(unitFinances) }
            </td>
            <td className={classes.td}>
                { totalYearlyInsurance(unitFinances) }
            </td>
            <td className={classes.td}>
                { totalRent(unitFinances) }
            </td>
            <td className={classes.td}>
                { totalMonthlyHoa(unitFinances) }
            </td>
        </tr>
    );
};

export default FinancialSummaryTotals;