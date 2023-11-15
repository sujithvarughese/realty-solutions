import classes from "./styles/Unit.module.css";
import {
	CreateUserForm,
	EditUnitForm,
	EditUserForm,
	CreateMessageForm,
	CreateRentReceiptForm,
} from "../";
import { useState } from "react";
import { Button, Card } from "../../UI/index.js";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { convertToUSD } from "../../utils/financeCalcs.js";
import { BiMessageSquareEdit } from "react-icons/bi"


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

	const navigate = useNavigate()
	const navigateToUnitFinancials = () => {
		navigate(`/accounting/${unit._id}`)
	}

	return (
		<div className={classes.container}>
			<Card>
				<div className={classes.content}>

				<NavLink
					to={`../accounting/${unit._id}`}
					className={classes.link}
				>
					<img src={image} alt="img" className={classes.image}/>
				</NavLink>



					<div className={classes.info}>
						{ showEditUnitForm && <EditUnitForm cancel={()=>setShowEditUnitForm(false)} unit={unit}/> }
						{ showEditUserForm && <EditUserForm cancel={()=>setShowEditUserForm(false)} user={user}/> }
						{
							!showEditUnitForm && !showEditUserForm &&
							<div className={classes.addressContainer}>
								<div className={classes.address}>
									<NavLink
										to={`../accounting/${unit._id}`}
										className={classes.link}
									>
										<div className={classes.addressLine1}>
											<span>{unitID} </span>
											<span>{street}</span>
										</div>
									</NavLink>


									<div className={classes.addressLine2}>
										<span>{city}, </span>
										<span>{state} </span>
										<span>{zip}</span>
									</div>
								</div>
								<div
									className={classes.edit}
									onClick={()=>setShowEditUnitForm(true)}
								>
									[Edit]
								</div>
							</div>
						}
						{
							user && !showEditUserForm && !showEditUnitForm &&
							<div className={classes.userContainer}>
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
								<div
									className={classes.editUser}
									onClick={()=>setShowEditUserForm(true)}
								>
									[Edit]
								</div>
							</div>
						}
					</div>



					<div className={classes.details}>
						<div>
							{bedrooms}-br / {bathrooms}-bath
						</div>
						{
							user &&
							<div className={classes.rent}>
								Rent: {convertToUSD(user.rent)}
							</div>
						}

					</div>


					{
						// if occupied show edit user button, else show create user button
						occupied ?
						<div className={classes.actions}>
							<div
								className={classes.link}
								onClick={() => setShowMessageForm(prevState => !prevState)}
							>
								<div className={classes.messageIcon}>
									<BiMessageSquareEdit />
								</div>

							</div>
						</div>
							:
						<div className={classes.actions}>
							<div className={classes.link} onClick={() => setShowCreateUserForm(true)}>Create User</div>
						</div>
					}
				</div>
				<div className={classes.forms}>
					{/* forms open when state toggled */}

					{ showCreateUserForm && <CreateUserForm cancel={()=>setShowCreateUserForm(false)} unit={unit}/> }
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