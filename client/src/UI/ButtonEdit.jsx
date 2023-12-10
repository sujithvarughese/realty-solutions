import styled from "styled-components";

const ButtonEdit = styled.button`
	cursor: pointer;
	border: none;
	transition: 0.2s ease-in-out all;
    margin: 0.4rem;
    font-size: ${props => props.fontSize || "16px"};

  
	&:hover {
		color: var(--COLOR-ALT);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
	


  
`


export default ButtonEdit;