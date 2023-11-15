import classes from "./styles/SearchRentReceiptsForm.module.css";
import {Button, Card, Form, InputSelect} from "../../../UI/index.js";
import {useState} from "react";
import {axiosDB} from "../../../utils/axios.js";

const SearchRentReceiptsForm = ({ tenant, setRentReceipts }) => {

    const getRentReceipts = async (year) => {
        try {
            const response = await axiosDB(`/finance/rent/${tenant.id}/${year}`)
            const { rentReceipts } = response.data
            setRentReceipts(rentReceipts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
        <Card>
        <Form>
            <div className={classes.form}>
                <div className={classes.title}>
                    Search Rent Receipts
                </div>
                <div className={classes.year}>
                    <InputSelect
                        htmlFor="year"
                        placeholder="YEAR"
                        type="text"
                        name="year"
                        list={years}
                        onChange={(e)=>getRentReceipts(e.target.value)}
                    ></InputSelect>
                </div>
            </div>
        </Form>
        </Card>

        </div>
    );
};


const years = ["2023", "2022", "2021", "2020"]
export default SearchRentReceiptsForm;