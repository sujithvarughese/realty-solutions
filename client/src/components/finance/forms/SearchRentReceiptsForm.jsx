import classes from "./styles/SearchRentReceiptsForm.module.css";
import {Button, Card, Form, InputSelect} from "../../../UI/index.js";
import {useState} from "react";
import {axiosDB} from "../../../utils/axios.js";

const SearchRentReceiptsForm = ({ tenant, setRentReceipts }) => {
    const date = new Date()
    const [year, setYear] = useState(date.toLocaleString('en-us',{ year:'numeric' }))
    const [month, setMonth] = useState(date.toLocaleString('en-us',{ month:'long' }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosDB(`/finance/rent/${tenant}/${year}/${month}`)
            const { rentReceipts } = response.data
            setRentReceipts(rentReceipts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
        <Card>
        <Form onSubmit={handleSubmit}>
            <div className={classes.form}>
                <div className={classes.title}>
                    Search Rent Receipts
                </div>
                <div className={classes.content}>
                    <div className={classes.year}>
                        <InputSelect
                            htmlFor="year"
                            label="year: "
                            type="text"
                            name="year"
                            value={year}
                            list={years}
                            onChange={(e)=>setYear(e.target.value)}
                        ></InputSelect>
                    </div>
                    <div className={classes.month}>
                        <InputSelect
                            htmlFor="month"
                            label="month: "
                            type="text"
                            name="month"
                            value={month}
                            list={months}
                            onChange={(e)=>setMonth(e.target.value)}
                        ></InputSelect>
                    </div>

                    <Button>
                        Get Rent Receipts
                    </Button>


                </div>
            </div>
        </Form>
        </Card>

        </div>
    );
};

const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
const years = ["2023", "2022", "2021", "2020"]
export default SearchRentReceiptsForm;