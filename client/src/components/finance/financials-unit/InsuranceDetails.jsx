import classes from "./styles/FinanceUnitDetails.module.css";
import {convertToUSD} from "../../../utils/financeCalcs.js";
import {useState} from "react";
import {Button, Input} from "../../../ui/index.js";
import FinanceDetailsRow from "./FinanceDetailsRow.jsx";
const InsuranceDetails = ({ insurance }) => {

    const { company, agent, phone, email, coverage, annualPremium } = insurance

    const [editMode, setEditMode] = useState(!(company && agent && phone && email && coverage && annualPremium))

    const [values, setValues] = useState({
        company: company || "",
        agent: agent || "",
        phone: phone || "",
        email: email || "",
        coverage: coverage || "",
        annualPremium: annualPremium || ""
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const cancel = () => {
        setValues({
            company: company || "",
            agent: agent || "",
            phone: phone || "",
            email: email || "",
            coverage: coverage || "",
            annualPremium: annualPremium || ""

        })
        setEditMode(false)
    }
    const update = () => {
        updateUnitFinance({ insurance: values })
        setEditMode(false)
    }

    return (
        <div className={classes.container}>
        <div className={classes.table}>
            <div className={classes.head}>
                <div className={classes.title}>
                    Insurance
                </div>
                <div className={classes.editDesktop}>
                    {!editMode && <ButtonEdit onClick={()=>setEditMode(!editMode)}>[Edit]</ButtonEdit>}
                </div>
            </div>
            <div className={classes.body}>
                <FinanceDetailsRow
                    label="Company"
                    display={(company && !editMode) ? values.company
                        :
                        <Input
                            name="company"
                            type="text"
                            value={values.company}
                            onChange={handleChange}
                        />
                    }
                />
                <FinanceDetailsRow
                    label="Agent"
                    display={(company && !editMode) ? values.agent
                        :
                        <Input
                            name="agent"
                            type="text"
                            value={values.agent}
                            onChange={handleChange}
                        />
                    }
                />
                <FinanceDetailsRow
                    label="Phone"
                    display={(phone && !editMode) ? values.phone
                        :
                        <Input
                            name="phone"
                            type="text"
                            value={values.phone}
                            onChange={handleChange}
                        />
                    }
                />
                <FinanceDetailsRow
                    label="Email"
                    display={(email && !editMode) ? values.email
                        :
                        <Input
                            name="company"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    }
                />
                <FinanceDetailsRow
                    label="Coverage"
                    display={(coverage && !editMode) ? values.coverage
                        :
                        <Input
                            name="coverage"
                            type="text"
                            value={values.coverage}
                            onChange={handleChange}
                        />
                    }
                />
                <FinanceDetailsRow
                    label="Annual Premium"
                    display={(annualPremium && !editMode) ? convertToUSD(values.annualPremium)
                        :
                        <Input
                            name="annualPremium"
                            type="number"
                            value={values.annualPremium}
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
        </div>
    );
};

export default InsuranceDetails;