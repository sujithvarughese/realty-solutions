import classes from "../../../pages/accounting/styles/FinancialSummary.module.css";
import  { totalMortgage, totalPropertyTax, totalInsurance, totalRent, totalHoa, totalProfit } from "../../../utils/financeCalcs.js";

const FinancialSummaryTotals = ({ unitFinances, term }) => {

    return (
        <tr>
            <td>
                Totals:
            </td>
            <td></td>
            <td>
                {convertToUSD(totalMortgage(unitFinances, term))}
            </td>
            <td>
                {convertToUSD(totalPropertyTax(unitFinances, term))}
            </td>
            <td>
                {convertToUSD(totalInsurance(unitFinances, term))}
            </td>
            <td>
                {convertToUSD(totalHoa(unitFinances, term))}
            </td>
            <td>
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