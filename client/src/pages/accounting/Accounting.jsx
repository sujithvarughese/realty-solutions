
import { Outlet } from "react-router-dom";

// /accounting will render overall finances and /accounting/:id will render by unit
const Accounting = () => {
	window.scrollTo(0, 0)
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default Accounting;