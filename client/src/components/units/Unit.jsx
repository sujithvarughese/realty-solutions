import classes from "./styles/Unit.module.css";
import { CreateUserForm, EditUnitForm, EditUserForm, CreateMessageForm } from "../";
import { useState } from "react";
import { Button } from "../../UI/index.js";
import { Md1K } from "react-icons/md";
const Unit = ({ unit }) => {

	const { unitID, street, city, state, zip, image, occupied, user } = unit
	// state functions to hide and show forms
	const [showEditUnitForm, setShowEditUnitForm] = useState(false)
	const [showCreateUserForm, setShowCreateUserForm] = useState(false)
	const [showEditUserForm, setShowEditUserForm] = useState(false)
	const [showMessageForm, setShowMessageForm] = useState(false)
	return (
		<div className={classes.unit}>

			<img src={image} alt="img" className={classes.image}/>


			<div className={classes.address}>
				<div className={classes.addressLine1}>
					<span>{unitID} </span>
					<span>{street}</span>
				</div>
				<div className={classes.addressLine2}>
					<span>{city}, </span>
					<span>{state} </span>
					<span>{zip}</span>
				</div>
			</div>

			{
				// if occupied show edit user button, else show create user button
				occupied ?
				<div className={classes.actions}>
					<Button onClick={() => setShowEditUnitForm(true)}>Edit Unit</Button>
					<Button onClick={() => setShowEditUserForm(true)}>Edit User</Button>
					<Button onClick={() => setShowMessageForm(true)}>Message Tenant</Button>
				</div>
					:
				<div className={classes.actions}>
					<Button onClick={() => setShowEditUnitForm(true)}>Edit Unit</Button>
					<Button onClick={() => setShowCreateUserForm(true)}>Create User</Button>
				</div>
			}

			{/* forms open when state toggled */}
			{ showEditUnitForm && <EditUnitForm cancel={()=>setShowEditUnitForm(false)} unit={unit}/>}
			{ showCreateUserForm && <CreateUserForm cancel={()=>setShowCreateUserForm(false)} unit={unit}/> }
			{ showEditUserForm && <EditUserForm cancel={()=>setShowEditUserForm(false)} user={user}/> }

			{ showMessageForm &&
				<CreateMessageForm
					cancel={()=>setShowMessageForm(false)}
					addressBook={[{
						text: `${user.lastName}, ${user.firstName}`,
						value: user._id
					}]}
				/>
			}

		</div>
	);
};

export default Unit;