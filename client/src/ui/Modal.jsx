import classes from "./styles/Modal.module.css"
import Backdrop from "./Backdrop.jsx";


const Modal = (props) => {

	return (
		<div>
			<Backdrop >
			<div className={classes.modal}>
				{ props.children }
			</div>
			</Backdrop>
		</div>


	);
};

export default Modal;