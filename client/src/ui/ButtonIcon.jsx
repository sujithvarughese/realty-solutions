import styled from "styled-components";

const Button = styled.button`
	cursor: pointer;
	border: none;
    background-color: var(--COLOR-LIGHTER);
    height: 100%;
	border-radius: 6px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
	0 2px 4px -1px rgba(0, 0, 0, 0.06);
	transition: 0.3s ease-in-out all;
    margin: 0.4rem;
    font-size: ${props=> props.fontSize};
    line-height: 1;

	
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