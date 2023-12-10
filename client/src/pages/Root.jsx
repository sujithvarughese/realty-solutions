import classes from "./styles/Root.module.css";
import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import { DesktopNavbar, InfoBar, MobileNavbar } from "../components";
import { RiHome6Fill, RiMailFill, RiMoneyDollarCircleFill } from "react-icons/ri"
import { FaGlobe } from "react-icons/fa"
import {Loading} from "../ui/index.js";

const Root = () => {
	const navigation = useNavigation()
	// user={ userID, isAdmin }
	// logout function removes user info and sets to null
	const { user, logout } = useGlobalContext()
	const navigate = useNavigate();
	// links render dynamically based on role; admin, user, and public all have different navigation links
	const [links, setLinks] = useState(publicLinks)
	const logoutAndNavigateHome = () => {
		navigate("/")
		logout()
	}
	// if user changes, check if admin or user and set links for navigation and navigate accordingly
	useEffect(() => {
		if (user && Object.keys(user).length > 0) {
			if (user.role === "account-admin") {
				setLinks(adminLinks)
				navigate("/units");
			} else if (user.role === "user"){
				setLinks(userLinks)
				navigate("/home");
			} else if (user.role === "system-admin") {
				navigate("/admin")
			}
		} else {
			setLinks(publicLinks)
			navigate("/")
		}
	}, [user]);

	return (
		<div>
			{/* main navbar for desktop/larger than mobile screens */}
			<div className={classes.desktop}>
				<DesktopNavbar user={user} links={links} logout={logoutAndNavigateHome}/>
			</div>

			{/* top bar on mobile devices - should not include much functionality as this area differs on different devices */}
			<div className={classes.infobar}>
				<InfoBar user={user} logout={logoutAndNavigateHome}/>
			</div>

			<div className={classes.main}>
				{navigation.state === 'loading' && <Loading />}
				<Outlet />

			</div>

			{/* main navbar for mobile */}
			<div className={classes.mobile}>
				<MobileNavbar user={user} links={links}/>
			</div>
		</div>
	);
};

const adminLinks = [

	{
		name: "Units",
		icon: <RiHome6Fill />,
		url: "units"
	},
	{
		name: "Accounting",
		icon: <RiMoneyDollarCircleFill />,
		url: "accounting"
	},
	{
		name: "Messages",
		icon: <RiMailFill />,
		url: "messages"
	},
	{
		name: "Research",
		icon: <FaGlobe />,
		url: "research"
	}
]

const userLinks = [
	{
		name: "Home",
		icon: <RiHome6Fill />,
		url: "home"
	},
	{
		name: "Messages",
		icon: <RiMailFill />,
		url: "messages"
	},
	{
		name: "Payments",
		icon: <RiMoneyDollarCircleFill />,
		url: "payments"
	},
]

const publicLinks = [

]
export default Root;