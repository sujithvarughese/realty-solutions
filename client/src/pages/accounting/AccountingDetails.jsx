import classes from "./styles/AccountingDetails.module.css";
import {Outlet, useNavigate} from "react-router-dom";
import {InputSelect} from "../../UI/index.js";
import {useGlobalContext} from "../../context/GlobalContext.jsx";
import {useState} from "react";

const AccountingDetails = () => {

    const { units } = useGlobalContext()

    const [unitList, setUnitList] = useState(units.map(unit => {
        return {
            text: `${unit.unitID} ${unit.street}`,
            value: unit._id
        }
    }))

    const navigate = useNavigate()
    const handleChange = (e) => {
        navigate(`/accounting/details/${e.target.value}`)
    }

    return (
        <div>
            <InputSelect
                htmlFor="unit"
                label="UNIT"
                type="text"
                name="unit"
                list={unitList}
                onChange={handleChange}
            >
            </InputSelect>

            <Outlet />
        </div>
    );
};


export default AccountingDetails;