import classes from "./styles/FinancialSummaryMobile.module.css";
import {FinancialSummaryValues} from "../../index.js";
import {
    calculateMonthlyPayment, totalHoa,
    totalInsurance,
    totalMortgage, totalProfit,
    totalPropertyTax,
    totalRent
} from "../../../utils/financeCalcs.js";
import {IoRemoveCircle} from "react-icons/io5";
const FinancialSummaryMobile = ({ units, unitFinances, term, removeUnit }) => {



    return (
        <div className={classes.container}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Address</th>
                        <th>Finances</th>
                    </tr>
                </thead>
                <tbody>
                {
                    unitFinances.map(unitFinance => {
                        const { principal, interest, term: mortgageTerm } = unitFinance.mortgage
                        return (
                            <tr className={classes.values} key={unitFinance.id}>
                                <td onClick={()=>removeUnit(unitFinance.id)}>
                                    <IoRemoveCircle />
                                </td>
                                <td>
                                    {unitFinance.address}
                                </td>
                                <td>
                                    <div>
                                        Mortgage: {convertToUSD((calculateMonthlyPayment(principal, interest, mortgageTerm)) * term)}
                                    </div>
                                    <div>
                                        Tax: {convertToUSD(unitFinance.propertyTax * term)}
                                    </div>
                                    <div>
                                        Insurance: {convertToUSD(unitFinance.insurance * term)}
                                    </div>
                                    <div>
                                        HOA: {convertToUSD(unitFinance.hoa * term)}
                                    </div>
                                    <div>
                                        Rent: {convertToUSD(unitFinance.rent * term)}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className={classes.table}>
                <div className={classes.title}>
                    Combined Finances
                </div>
                <div className={classes.body}>
                    <div className={classes.tr}>
                        <div className={classes.td}>
                            Mortgage
                        </div>
                        <div className={classes.td}>
                            {convertToUSD(totalMortgage(unitFinances, term))}
                        </div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>
                            Taxes
                        </div>
                        <div className={classes.td}>
                            {convertToUSD(totalPropertyTax(unitFinances, term))}
                        </div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>
                            Insurance
                        </div>
                        <div className={classes.td}>
                            {convertToUSD(totalInsurance(unitFinances, term))}
                        </div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>
                            HOA
                        </div>
                        <div className={classes.td}>
                            {convertToUSD(totalHoa(unitFinances, term))}
                        </div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>
                            Rent
                        </div>
                        <div className={classes.td}>
                            {convertToUSD(totalRent(unitFinances, term))}
                        </div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>
                            Profit
                        </div>
                        <div className={classes.td}>
                            {convertToUSD(totalProfit(unitFinances, term))}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};
const convertToUSD = (number) => {
    return  number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}
export default FinancialSummaryMobile;