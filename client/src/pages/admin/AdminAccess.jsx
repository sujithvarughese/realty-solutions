import classes from "./styles/AdminAccess.module.css";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import CreateAccountForm from "./CreateAccountForm.jsx";
import {useState} from "react";

const AdminAccess = () => {

    const accounts = useLoaderData()
    const [showCreateAccountForm, setShowCreateAccountForm] = useState(false)

    return (
        <div>
            Accounts
            <div>
                {
                    accounts.map(account => {
                        return (
                            <div key={account._id}>
                                {account.admin.email}
                                {account.admin.lastName}
                                {account.admin.firstName}
                            </div>
                        )
                    })
                }
            </div>
            <div onClick={()=>setShowCreateAccountForm(true)}>
                Create new account
            </div>
            {
                showCreateAccountForm &&
                <CreateAccountForm cancel={()=>setShowCreateAccountForm(false)}/>
            }
        </div>
    );
};

export const adminAccessLoader = async () => {
    try {
        const response = await axiosDB("/accounts")
        const { accounts } = response.data
        return accounts
    } catch (error) {
        console.log(error)
    }
}

export default AdminAccess;