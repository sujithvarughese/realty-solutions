import classes from "./styles/FinanceUnitDetails.module.css";
import { CalculateProfitForm } from "../../"
import {useState} from "react";
import { convertToUSD } from "../../../utils/financeCalcs.js";

const FinanceDetails = ({ purchasePrice, rent, fairMarketRent, annualPropertyTax, annualInsurancePremium, annualHoa }) => {

    const [profit, setProfit] = useState("")

    return (
        <div className={classes.container}>

            <div className={classes.table}>
                <div className={classes.head}>
                    Overview
                </div>
                <div className={classes.body}>
                    <div className={classes.tr}>
                        <div className={classes.td}>Purchase Price</div>
                        <div className={classes.td}>{convertToUSD(purchasePrice)}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Rent</div>
                        <div className={classes.td}>{convertToUSD(rent)}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Fair Market Rent</div>
                        <div className={classes.td}>{convertToUSD(fairMarketRent)}</div>
                    </div>
                </div>
            </div>

            <div className={classes.calcProfit}>

                <CalculateProfitForm
                    annualPropertyTax={annualPropertyTax}
                    annualInsurancePremium={annualInsurancePremium}
                    annualHoa={annualHoa}
                    rent={rent}
                    setProfit={setProfit}
                />

                {
                    profit &&
                    <div className={classes.result}>
                        Total Profit: {convertToUSD(profit)}
                    </div>
                }


            </div>
        </div>
    );
};

export default FinanceDetails;