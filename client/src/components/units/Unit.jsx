import classes from "./styles/Unit.module.css";
import {
	CreateUserForm,
	EditUnitForm,
	EditUserForm,
	CreateMessageForm,
	CreateRentReceiptForm,
	UnitFinancials,
	EditUnit
} from "../";
import { useState } from "react";
import { Button, Card } from "../../UI/index.js";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Unit = ({ unit }) => {

	const { unitID, street, city, state, zip, image, occupied, user, bedrooms, bathrooms } = unit
	// state functions to hide and show forms
	const [showEditUnitForm, setShowEditUnitForm] = useState(false)
	const [showCreateUserForm, setShowCreateUserForm] = useState(false)
	const [showEditUserForm, setShowEditUserForm] = useState(false)
	const [showMessageForm, setShowMessageForm] = useState(false)
	const [showEditFinancialsForm, setShowEditFinancialsForm] = useState(false)
	const [showCreateRentReceipt, setShowCreateRentReceipt] = useState(false)
	const [showUnitFinancials, setShowUnitFinancials] = useState(false)
	const [editUnit, setEditUnit] = useState(false)

	const navigate = useNavigate()
	const navigateToUnitFinancials = () => {
		navigate(`/accounting/${unit._id}`)
	}

	return (

		<div className={classes.container}>
			<Card>
				<div className={classes.content}>
					<img src={image} alt="img" className={classes.image}/>

					<div className={classes.info}>
						{
							editUnit ?
								<EditUnit cancel={()=>setEditUnit(false)} unit={unit}/>
								:
								<div className={classes.edit}>
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
									<div onClick={()=>setEditUnit(true)}>
										Edit
									</div>
								</div>
						}
						{
							user &&
							<div className={classes.tenant}>
								<div className={classes.tenantName}>
									Tenant: {user.firstName} {user.lastName}
								</div>
								<div className={classes.tenantEmail}>
									{user.email}
								</div>
								<div className={classes.tenantPhone}>
									{user.phone}
								</div>
							</div>
						}
					</div>

					<div className={classes.mobileContact}>
						<div className={classes.button}>
							<Button>Call</Button>
						</div>
						<div className={classes.button}>
							<Button onClick={() => setShowMessageForm(true)}>Email</Button>
						</div>
					</div>

					<div className={classes.details}>
						<div>
							{bedrooms}-br / {bathrooms}-bath
						</div>
					</div>


					{
						// if occupied show edit user button, else show create user button
						occupied ?
						<div className={classes.actions}>
							<div
								className={classes.link}
								onClick={() => setShowEditUnitForm(prevState => !prevState)}
							>
								{showEditUnitForm ? "Close Edit Unit" : "Edit Unit"}
							</div>
							<NavLink
								to={`../accounting/details/${unit._id}`}
								className={classes.link}
							>
								View Finances
							</NavLink>
							<div
								className={classes.link}
								onClick={() => setShowEditUserForm(prevState => !prevState)}
							>
								{showEditUserForm ? "Close Edit User" : "Edit User"}
							</div>
							<div
								className={classes.link}
								onClick={() => setShowMessageForm(prevState => !prevState)}
							>
								Message Tenant
							</div>
							<div
								className={classes.link}
								onClick={() => setShowCreateRentReceipt(prevState => !prevState)}
							>
								{ showCreateRentReceipt ? "Close Form" : "Send Rent Receipt"}
							</div>
						</div>
							:
						<div className={classes.actions}>
							<div className={classes.link} onClick={() => setShowEditUnitForm(true)}>Edit Unit</div>
							<div className={classes.link} onClick={() => setShowCreateUserForm(true)}>Create User</div>
						</div>
					}
				</div>
				<div className={classes.forms}>
					{/* forms open when state toggled */}
					{ showEditUnitForm && <EditUnitForm cancel={()=>setShowEditUnitForm(false)} unit={unit}/>}
					{ showUnitFinancials && <UnitFinancials close={()=>setShowUnitFinancials(false)} unit={unit._id}/>}

					{ showCreateUserForm && <CreateUserForm cancel={()=>setShowCreateUserForm(false)} unit={unit}/> }
					{ showEditUserForm && <EditUserForm cancel={()=>setShowEditUserForm(false)} user={user}/> }
					{ showCreateRentReceipt && <CreateRentReceiptForm cancel={()=>setShowCreateRentReceipt(false)} user={user}/> }
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
			</Card>
		</div>

	);
};

export default Unit;