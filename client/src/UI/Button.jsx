import styled from "styled-components";

const Button = styled.button`
	cursor: pointer;
	color: #fff;
    width: 100%;
	font-weight: bold;
	background: var(--COLOR-DARK);
	border: none;
	border-radius: 6px;
	letter-spacing: 1px;
	padding: 17px 11px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
	0 2px 4px -1px rgba(0, 0, 0, 0.06);
	transition: 0.2s ease-in-out all;
	
	&:hover {
		background: var(--COLOR-DARK);
		color: var(--COLOR-ALT);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
	
	&:focus {
		outline: 4px auto -webkit-focus-ring-color;
		outline-offset: -1px;
	}
	@media(min-width: 600px) {
		padding: 11px;
        width: 200px;
	}
`


export default Button;