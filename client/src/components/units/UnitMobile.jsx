import classes from "./styles/UnitMobile.module.css";
import { Button, Card } from "../../UI/index.js";
import { CreateMessageForm } from "../index.js";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const UnitMobile = ({ unit }) => {

    const { unitID, street, city, state, zip, image, user } = unit
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
                                    to={`../accounting/${unit._id}`}
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
                                    Tenant: {user.firstName} {user.lastName}
                                </div>


                            </div>
                        }
                    </div>

                    <div className={classes.buttons}>
                        <div className={classes.button}>
                            <Button styles="buttonMobile">Call</Button>
                        </div>
                        <div className={classes.button}>
                            <Button styles="buttonMobile" onClick={() => setShowMessageForm(true)}>Email</Button>
                        </div>
                    </div>

                </div>

                <div className={classes.forms}>
                    {/* forms open when state toggled */}

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

export default UnitMobile;