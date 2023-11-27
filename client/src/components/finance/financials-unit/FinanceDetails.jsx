import classes from "./styles/FinanceUnitDetails.module.css";
import { CalculateProfitForm} from "../../"
import {useState} from "react";
import { convertToUSD } from "../../../utils/financeCalcs.js";
import FinanceDetailsRow from "./FinanceDetailsRow.jsx";
import {Input, Button, ButtonEdit} from "../../../ui/index.js";

const FinanceDetails = ({ updateUnitFinance, purchasePrice, rent, fairMarketRent, annualPropertyTax, annualInsurancePremium, annualHoa }) => {

    const [profit, setProfit] = useState("")

    const [editMode, setEditMode] = useState(false)

    const [values, setValues] = useState({
        purchasePrice: purchasePrice,
        rent: rent,
        fairMarketRent: fairMarketRent
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: Number(e.target.value) })
    }

    const cancel = () => {
        setValues({
            purchasePrice: purchasePrice,
            rent: rent,
            fairMarketRent: fairMarketRent
        })
        setEditMode(false)
    }

    const update = () => {
        updateUnitFinance(values)
        setEditMode(false)
    }

    return (
        <div className={classes.container}>

            <div className={classes.table}>
                <div className={classes.head}>
                    <div className={classes.title}>
                        Overview
                    </div>
                    <div className={classes.editDesktop}>
                        {!editMode && <ButtonEdit onClick={()=>setEditMode(!editMode)}>[Edit]</ButtonEdit>}
                    </div>
                </div>

                <div className={classes.body}>
                    <FinanceDetailsRow
                        label="Purchase Price"
                        display={(purchasePrice && !editMode) ? convertToUSD(values.purchasePrice)
                            :
                            <Input
                                name="purchasePrice"
                                type="number"
                                value={values.purchasePrice}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Rent"
                        display={(rent && !editMode) ? convertToUSD(values.rent)
                            :
                            <Input
                                name="rent"
                                type="number"
                                value={values.rent}
                                onChange={handleChange}
                            />
                        }
                    />
                    <FinanceDetailsRow
                        label="Fair Market Rent"
                        display={(fairMarketRent && !editMode) ? convertToUSD(values.fairMarketRent)
                            :
                            <Input
                                name="fairMarketRent"
                                type="number"
                                value={values.fairMarketRent}
                                onChange={handleChange}
                            />
                        }
                    />
                    {
                        editMode &&
                        <div className={classes.buttons}>
                            <Button onClick={update}>Update</Button>
                            <Button onClick={cancel}>Cancel</Button>
                        </div>
                    }
                </div>
            </div>
            <div className={classes.editMobile}>
                {!editMode && <Button onClick={()=>setEditMode(!editMode)}>Edit</Button>}
            </div>

            {
                purchasePrice && rent &&

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
            }
        </div>
    );
};

export default FinanceDetails;