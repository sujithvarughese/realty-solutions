import classes from "./styles/Unit.module.css";
import {
	CreateUserForm,
	EditUnitForm,
	EditUserForm,
	CreateMessageForm,
} from "../";
import { useState } from "react";
import { Card, ButtonEdit, Button, ButtonIcon } from "../../ui/index.js";
import { NavLink } from "react-router-dom";
import { convertToUSD } from "../../utils/financeCalcs.js";
import { BiMessageSquareEdit } from "react-icons/bi"

const Unit = ({ unit }) => {

	const { houseNumber, street, city, apartmentNumber, state, zip, image, bedrooms, bathrooms, tenant, user } = unit

	// state functions to hide and show forms
	const [showEditUnitForm, setShowEditUnitForm] = useState(false)
	const [showCreateUserForm, setShowCreateUserForm] = useState(false)
	const [showEditUserForm, setShowEditUserForm] = useState(false)
	const [showMessageForm, setShowMessageForm] = useState(false)

	return (
		<div className={classes.container}>
			<Card>
				<div className={classes.content}>

					{/* clicking image or address navigates to FinancesUnit */}
					<NavLink
						to={{ pathname: `../accounting/${unit._id }`}}
						state={{ houseNumber, street, apartmentNumber, city, state, zip, tenant, user }}
						className={classes.link}
					>
						<img src={image} alt="img" className={classes.image}/>
					</NavLink>

					<div className={classes.info}>
						{ showEditUnitForm && <EditUnitForm cancel={()=>setShowEditUnitForm(false)} unit={unit}/> }
						{ showEditUserForm && <EditUserForm cancel={()=>setShowEditUserForm(false)} userID={user} tenant={tenant}/> }
						{
							!showEditUnitForm && !showEditUserForm &&
							<div className={classes.addressContainer}>
								<div className={classes.address}>
									<NavLink
										to={{ pathname: `../accounting/${unit._id }`}}
										state={{ houseNumber, street, apartmentNumber, city, state, zip, tenant, user }}
										className={classes.link}
									>
										<div className={classes.addressLine1}>
											<span>{houseNumber} </span>
											<span>{street} </span>
											<span>{apartmentNumber}</span>
										</div>
									</NavLink>


									<div className={classes.addressLine2}>
										<div>
											<span>{city}, </span>
											<span>{state} </span>
											<span>{zip}</span>
										</div>
										<ButtonEdit
											onClick={()=>setShowEditUnitForm(true)}
										>[Edit]
										</ButtonEdit>
									</div>
								</div>


							</div>
						}
						{
							user && !showEditUserForm && !showEditUnitForm &&
							<div className={classes.userContainer}>
								<div className={classes.tenant}>
									<div className={classes.tenantName}>
										Tenant: {tenant.firstName} {tenant.lastName}
									</div>
									<div className={classes.tenantEmail}>
										{tenant.email}
									</div>
									<div className={classes.tenantPhone}>
										{tenant.phone}
									</div>
								</div>
								<ButtonEdit
									onClick={()=>setShowEditUserForm(true)}
								>[Edit]
								</ButtonEdit>
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
								Rent: {convertToUSD(tenant.rent)}
							</div>
						}

					</div>

					{
						// if occupied show message user icon, else show create user button
						user ?
						<div className={classes.actions}>

							<ButtonIcon
								onClick={()=>setShowMessageForm(prevState => !prevState)}
								fontSize="56px"
							>
								<BiMessageSquareEdit />
							</ButtonIcon>

						</div>
							:
						<div className={classes.actions}>
							<div className={classes.link} onClick={() => setShowCreateUserForm(true)}>Create User</div>
						</div>
					}
				</div>

				<div className={classes.forms}>
					{/* forms open when state toggled */}

					{ showCreateUserForm && <CreateUserForm cancel={()=>setShowCreateUserForm(false)} unitID={unit._id}/> }

					{ showMessageForm &&
						<CreateMessageForm
							cancel={()=>setShowMessageForm(false)}
							addressBook={[{
								text: `${tenant.lastName}, ${tenant.firstName}`,
								value: user
							}]}
						/>
					}
				</div>
			</Card>
		</div>

	);
};

export default Unit;