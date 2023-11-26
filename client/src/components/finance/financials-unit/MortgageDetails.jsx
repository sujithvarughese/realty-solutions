import classes from "./styles/FinanceUnitDetails.module.css";
import {CalculateMonthlyPaymentForm, CalculatePayoffForm} from "../../index.js";
import {useState} from "react";
import { convertToUSD } from "../../../utils/financeCalcs.js";

const MortgageDetails = ({ mortgage }) => {

    const [payoffAmount, setPayoffAmount] = useState("")
    const [monthlyPayment, setMonthlyPayment] = useState("")

    return (
        <div className={classes.container}>
            <div className={classes.table}>
                <div className={classes.head}>
                    Mortgage
                </div>
                <div className={classes.body}>
                    <div className={classes.tr}>
                        <div className={classes.td}>Bank</div>
                        <div className={classes.td}>{mortgage.bank}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Principal</div>
                        <div className={classes.td}>{convertToUSD(mortgage.principal)}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Interest</div>
                        <div className={classes.td}>{mortgage.interest}%</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Term</div>
                        <div className={classes.td}>{mortgage.term} months</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Payments Made</div>
                        <div className={classes.td}>{mortgage.paymentsMade}</div>
                    </div>
                </div>
            </div>

            <div className={classes.calcPayment}>
                <CalculateMonthlyPaymentForm
                    principal={mortgage.principal}
                    apr={mortgage.interest}
                    termYears={mortgage.term}
                    setMonthlyPayment={setMonthlyPayment}
                />
                {
                    monthlyPayment &&
                    <div className={classes.result}>
                        Monthly Payment: {convertToUSD(monthlyPayment)}
                    </div>
                }
            </div>

            <div className={classes.calcPayoff}>
                <CalculatePayoffForm
                    principal={mortgage.principal}
                    apr={mortgage.interest}
                    termYears={mortgage.term}
                    paymentsMade={mortgage.paymentsMade}
                    setPayoffAmount={setPayoffAmount}
                />
                {
                    payoffAmount &&
                    <div className={classes.result}>
                        Payoff Amount: {convertToUSD(payoffAmount)}
                    </div>
                }
            </div>


        </div>

    );
};

export default MortgageDetails;