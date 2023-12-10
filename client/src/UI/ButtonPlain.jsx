import styled from "styled-components";

const ButtonPlain = styled.button`
    cursor: pointer;
    border: none;
    transition: 0.3s ease-in-out all;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    background-color: inherit;
  
	&:hover {
		color: var(--COLOR-ALT);
	}
`
export default ButtonPlain;