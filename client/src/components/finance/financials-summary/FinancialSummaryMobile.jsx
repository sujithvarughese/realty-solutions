import classes from "./styles/FinancialSummaryMobile.module.css";
import { NavLink } from "react-router-dom";
import {
    calculateMonthlyPayment,
    totalHoa,
    totalInsurance,
    totalMortgage, totalProfit,
    totalPropertyTax,
    totalRent
} from "../../../utils/financeCalcs.js";
import {IoRemoveCircle} from "react-icons/io5";

const FinancialSummaryMobile = ({ unitFinances, term, removeUnit }) => {

    return (
        <div className={classes.container}>
            <table>
                <thead>
                    <tr>
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
                                <td className={classes.addressCol}>
                                    <NavLink
                                        to={`${unitFinance.unit}`}
                                        className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
                                    >
                                        <div>
                                            {unitFinance.address}
                                        </div>
                                    </NavLink>
                                    <div
                                        onClick={()=>removeUnit(unitFinance.id)}
                                        className={classes.remove}
                                    >
                                        <IoRemoveCircle />
                                    </div>
                                </td>
                                <td className={classes.finances}>
                                    <div className={classes.tr}>
                                        <div className={classes.td}>
                                            Mortgage
                                        </div>
                                        <div className={classes.td}>
                                            {convertToUSD((calculateMonthlyPayment(principal, interest, mortgageTerm)) * term)}
                                        </div>
                                    </div>
                                    <div className={`${classes.tr} ${classes.shaded}`}>
                                        <div className={classes.td}>
                                            Tax
                                        </div>
                                        <div className={classes.td}>
                                            {convertToUSD(unitFinance.propertyTax * term)}
                                        </div>
                                    </div>
                                    <div className={classes.tr}>
                                        <div className={classes.td}>
                                            Insurance
                                        </div>
                                        <div className={classes.td}>
                                            {convertToUSD(unitFinance.insurance * term)}
                                        </div>
                                    </div>
                                    <div className={`${classes.tr} ${classes.shaded}`}>
                                        <div className={classes.td}>
                                            HOA
                                        </div>
                                        <div className={classes.td}>
                                            {convertToUSD(unitFinance.hoa * term)}
                                        </div>
                                    </div>
                                    <div className={classes.tr}>
                                        <div className={classes.td}>
                                            Rent
                                        </div>
                                        <div className={classes.td}>
                                            {convertToUSD(unitFinance.rent * term)}
                                        </div>
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