import classes from "./styles/RentReceiptForms.module.css";
import {Button, Card, Form, Select} from "../../../ui/index.js";
import { axiosDB } from "../../../utils/axios.js";
import FormRow from "../../../ui/FormRow.jsx";

const SearchRentReceiptsForm = ({ userID, setRentReceipts }) => {

    const getRentReceipts = async (year) => {
        try {
            const response = await axiosDB(`/finance/rent/${userID}/${year}`)
            const { rentReceipts } = response.data
            setRentReceipts(rentReceipts)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Card>
            <div className={classes.content}>
                <Form className={classes.form} title="Search">
                    <div className={classes.year}>
                        <FormRow label="Year">
                            <Select
                                type="text"
                                name="year"
                                list={years}
                                onChange={(e)=>getRentReceipts(e.target.value)}
                            ></Select>
                        </FormRow>
                    </div>
                    <div className={classes.button}>
                        <Button type="submit">Get Receipts</Button>
                    </div>
                </Form>
            </div>
        </Card>

    );
};


const years = ["2023", "2022", "2021", "2020"]
export default SearchRentReceiptsForm;