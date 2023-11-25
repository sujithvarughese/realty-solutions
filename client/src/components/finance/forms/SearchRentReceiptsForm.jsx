import classes from "./styles/SearchRentReceiptsForm.module.css";
import { Card, Form, Select } from "../../../ui/index.js";
import { axiosDB } from "../../../utils/axios.js";

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
        <div className={classes.container}>
        <Card>
        <Form title="Search Rent Receipts">
            <div className={classes.form}>
                <div className={classes.year}>
                    <Select
                        type="text"
                        name="year"
                        list={years}
                        onChange={(e)=>getRentReceipts(e.target.value)}
                    ></Select>
                </div>
            </div>
        </Form>
        </Card>

        </div>
    );
};


const years = ["2023", "2022", "2021", "2020"]
export default SearchRentReceiptsForm;