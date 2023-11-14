import classes from "./styles/InfoBar.module.css"
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Button } from "../../UI";
import { useNavigate } from "react-router-dom";

const InfoBar = ({ user, logout }) => {
	const navigate = useNavigate()
	return (
		<div className={classes.infoBar}>
			{
				user ?
				<div className={classes.title}>
					Realty Solutions
				</div>
					:
				<div className={classes.titleRedirect} onClick={()=>navigate("/")}>
				Realty Solutions
				</div>
			}


			{
				user &&
					<div
						className={classes.link}
						onClick={logout}
					>
						Logout
					</div>
			}


		</div>
	);
};

export default InfoBar;