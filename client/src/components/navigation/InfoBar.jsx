import classes from "./styles/InfoBar.module.css"
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { Button } from "../../UI";

const InfoBar = ({ user, logout }) => {

	return (
		<div className={classes.infoBar}>
			<div className={classes.title}>
				Realty Solutions
			</div>

			{
				user &&
					<div className={classes.logout}>
						<Button onClick={logout}>Logout</Button>
					</div>
			}


		</div>
	);
};

export default InfoBar;