import styled from "styled-components";

const Card = styled.div`
	padding: 1rem;
	color: var(--COLOR-LIGHT);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
	0 2px 4px -1px rgba(0, 0, 0, 0.06);
	transition: 0.3s ease-in-out all;
	border-radius: 0.75rem;
	z-index: 10;
	background-color: white;
	
	&:hover {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	@media (min-width: 600px) {
		padding: 2rem;
	}

`

export default Card;