
import { Outlet } from "react-router-dom";

// /accounting will render overall finances and /accounting/:id will render by unit
const Accounting = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default Accounting;