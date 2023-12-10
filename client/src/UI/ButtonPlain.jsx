import styled from "styled-components";

const ButtonPlain = styled.button`
    cursor: pointer;
    border: none;
    transition: 0.3s ease-in-out all;
    color: inherit;
    background-color: inherit;
    text-decoration: inherit;
    font: inherit;
    font-size: ${props => props.fontSize || "inherit"};
	&:hover {
		color: var(--COLOR-ALT);
	}
`
export default ButtonPlain;