import classes from "./styles/UnitMobile.module.css";
import { Button, Card } from "../../UI/index.js";
import { CreateMessageForm } from "../index.js";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const UnitMobile = ({ unit }) => {

    const { unitID, street, city, state, zip, image, user, tenant } = unit

    const phone = tenant?.phone.replace(/[^0-9]/g, "")

    // state functions to hide and show forms
    const [showMessageForm, setShowMessageForm] = useState(false)

    return (
        <div className={classes.container}>
            <Card>
                <div className={classes.content}>

                    <div className={classes.image}>
                        <img src={image} alt="img" className={classes.image}/>
                    </div>

                    <div className={classes.info}>
                        <div className={classes.address}>
                            <div className={classes.addressLine1}>
                                <NavLink
                                    to={{ pathname: `../accounting/${unit._id }`}}
                                    state={{ unitID, street, city, state, zip, tenant, user }}
                                    className={classes.link}
                                >
                                   {unitID} {street}
                                </NavLink>
                            </div>
                            <div className={classes.addressLine2}>
                                {city}, {state} {zip}
                            </div>
                        </div>

                        {
                            user &&
                            <div className={classes.tenant}>
                                <div className={classes.tenantName}>
                                    Tenant: {tenant.firstName} {tenant.lastName}
                                </div>


                            </div>
                        }
                    </div>

                    <div className={classes.buttons}>
                        <a href={`tel:${phone}`}>
                            <div className={classes.button}>
                                <Button styles="buttonMobile">Call</Button>
                            </div>
                        </a>
                        <div className={classes.button}>
                            <Button styles="buttonMobile" onClick={() => setShowMessageForm(true)}>Message</Button>
                        </div>
                    </div>

                </div>

                <div className={classes.forms}>
                    {/* forms open when state toggled */}

                    { showMessageForm &&
                        <CreateMessageForm
                            cancel={()=>setShowMessageForm(false)}
                            addressBook={[{
                                text: `${tenant.lastName}, ${tenant.firstName}`,
                                value: user._id
                            }]}
                        />
                    }
                </div>

            </Card>
        </div>
    );
};

export default UnitMobile;