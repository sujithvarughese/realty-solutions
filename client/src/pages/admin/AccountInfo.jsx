import classes from "./styles/AccountInfo.module.css";
import {useState} from "react";
import CreateAccountAdminForm from "./CreateAccountAdminRegistrationForm.jsx";
const AccountInfo = ({ account }) => {

    const { admin } = account
    const [accountEmpty, setAccountEmpty] = useState(admin === null)
    const [showCreateAccountAdminForm, setShowCreateAccountAdminForm] = useState(false)

    return (
        <tr>
            <td>
                {account._id}
            </td>
            {
                !accountEmpty ?
                    <>
                        <td>
                            {admin.email}
                        </td>
                        <td>
                            {admin.lastName}, {admin.firstName}
                        </td>
                        <td></td>
                    </>
                    :
                    <>
                        <td></td>
                        <td></td>
                        <td>
                            <div onClick={()=>setShowCreateAccountAdminForm(true)}>
                                Create new account admin
                            </div>
                            {
                                showCreateAccountAdminForm &&
                                <CreateAccountAdminForm
                                    cancel={()=>setShowCreateAccountAdminForm(false)}
                                    account={account._id}
                                />
                            }

                        </td>

                    </>
            }
        </tr>
    );
};

export default AccountInfo;