import styled from "styled-components";
import {createPortal} from "react-dom";

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow-y: auto;
	z-index: 100;
`

const StyledModal = styled.div`
	background: rgba(0, 0, 0, 0.5);
	border-radius: 15px;
	margin: auto;
	z-index: 100;
	padding: 1rem;
	width: 90vw;
	max-width: 1000px;
	color: var(--COLOR-LIGHTER);
	&:hover {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	@media (min-width: 600px) {

	}
`
const Modal = ({ closeFn, children }) => {
	return createPortal(
		<Backdrop onClick={closeFn}>
			<StyledModal onClick={(e) => e.stopPropagation()}>
				{children}
			</StyledModal>
		</Backdrop>
		, document.getElementById("modal")
	)
}
export default Modal;