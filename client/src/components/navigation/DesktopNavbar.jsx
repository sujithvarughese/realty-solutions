import classes from "./styles/DesktopNavbar.module.css"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DesktopNavbar = ({ user, links, logout }) => {

	const navigate = useNavigate()
	return (
		<div className={classes.container}>
			<div className={classes.navbar}>
				<div className={classes.content}>
					<div className={classes.title} onClick={()=>navigate("/")}>
						<div>Realty Solutions</div>
					</div>


					<div className={classes.links}>
						{
							links.map((link, index) => {
								return (
									<NavLink
										key={index}
										to={link.url}
										className={({ isActive }) => [classes.link, isActive ? classes.active : undefined].join(" ") }
										end
									>
										{link.name}
									</NavLink>
								)
							})
						}

						{
							user &&
							<div className={classes.link} onClick={logout}>
								Logout
							</div>
						}

					</div>
				</div>


			</div>
		</div>
	);
};

export default DesktopNavbar;