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
	z-index: 20;
`

const StyledModal = styled.div`
	background: rgba(0, 0, 0, 0.5);
	border-radius: 15px;
	z-index: 0;
	padding: 1rem;
	width: 90vw;
	max-width: 600px;
	color: var(--COLOR-LIGHTER);

	@media (min-width: 600px) {
		padding: 2rem;
	}
`
const Modal = (props) => {
	return createPortal(
		<Backdrop>
			<StyledModal>
				{props.children}
			</StyledModal>
		</Backdrop>
		, document.getElementById("modal")
	)
}
export default Modal;