import classes from "./styles/UnitFinancials.module.css";
import { CalculateProfitForm } from "../../"
import {useState} from "react";

const FinancialsOverview = ({ purchasePrice, rent, fairMarketRent, propertyTax, homeInsurance, hoa }) => {

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
                        <div className={classes.td}>{purchasePrice}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Rent</div>
                        <div className={classes.td}>{rent}</div>
                    </div>
                    <div className={classes.tr}>
                        <div className={classes.td}>Fair Market Rent</div>
                        <div className={classes.td}>{fairMarketRent}</div>
                    </div>
                </div>
            </div>

            <div className={classes.calcProfit}>
                <CalculateProfitForm
                    propertyTax={propertyTax}
                    homeInsurance={homeInsurance}
                    hoa={hoa}
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
const convertToUSD = (number) => {
    return  number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}
export default FinancialsOverview;