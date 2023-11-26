import styled from "styled-components";

const Button = styled.button`
	cursor: pointer;
	border: none;
    background-color: ${props=> props.backgroundColor};
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
	border-radius: 6px;
	transition: 0.3s ease-in-out all;


  
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


  
`


export default Button;