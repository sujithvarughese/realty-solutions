import classes from "./styles/FinanceUnitDetails.module.css";
import {CalculateMonthlyPaymentForm, CalculatePayoffForm} from "../../index.js";
import {useState} from "react";
import { convertToUSD } from "../../../utils/financeCalcs.js";
import {ButtonEdit, Input} from "../../../ui/index.js";
import FinanceDetailsRow from "./FinanceDetailsRow.jsx";

const MortgageDetails = ({ updateUnitFinance, mortgage }) => {

    const { bank, principal, interest, term, paymentsMade } = mortgage

    const [editMode, setEditMode] = useState(false)

    const [values, setValues] = useState({
        mortgage: {
            bank: bank,
            principal: principal,
            interest: interest,
            term: term,
            paymentsMade: paymentsMade
        }
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value})
    }

    const [payoffAmount, setPayoffAmount] = useState("")
    const [monthlyPayment, setMonthlyPayment] = useState("")

    return (
        <div className={classes.container}>
            <div className={classes.table}>
                <div className={classes.head}>
                    Mortgage
                </div>
                <ButtonEdit onClick={()=>setEditMode(!editMode)}>[Edit]</ButtonEdit>
                <div className={classes.body}>
                    <FinanceDetailsRow
                        label="Bank"
                        display={(bank && !editMode) ? values.mortgage.bank
                            :
                            <Input
                                name="bank"
                                type="text"
                                value={values.mortgage.bank}
                                onChange={handleChange}
                            />
                        }
                    />
                    <div className={classes.tr}>
                        <div className={classes.td}>Bank</div>
                        <div className={classes.td}>{bank}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Principal</div>
                        <div className={classes.td}>{convertToUSD(principal)}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Interest</div>
                        <div className={classes.td}>{interest}%</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Term</div>
                        <div className={classes.td}>{term} months</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Payments Made</div>
                        <div className={classes.td}>{paymentsMade}</div>
                    </div>
                </div>
            </div>

            <div className={classes.calcPayment}>
                <CalculateMonthlyPaymentForm
                    principal={principal}
                    apr={interest}
                    termYears={term}
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
                    principal={principal}
                    apr={interest}
                    termYears={term}
                    paymentsMade={paymentsMade}
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