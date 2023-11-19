import classes from "./styles/AdminAccess.module.css";
import { axiosDB } from "../../utils/axios.js";
import { useLoaderData } from "react-router-dom";
import CreateAccountAdminForm from "./CreateAccountAdminRegistrationForm.jsx";
import {useState} from "react";
import AccountInfo from "./AccountInfo.jsx";

const AdminAccess = () => {

    const accounts = useLoaderData()

    const [accountsState, setAccountsState] = useState(accounts)
    const createAccount = async () => {
        try {
            const response = await axiosDB.post("/accounts")
            const { account } = response.data
            setAccountsState([ ...accountsState, account ])
            console.log(account)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div onClick={createAccount}>
                Create Account
            </div>
            <table>
                <thead>
                <tr>
                    <th>Accounts</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        Account Id
                    </td>
                    <td>
                        Email
                    </td>
                    <td>
                        Admin Name
                    </td>
                </tr>
                {
                    accountsState?.map(account => <AccountInfo key={account._id} account={account}/>)
                }
                </tbody>

            </table>
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