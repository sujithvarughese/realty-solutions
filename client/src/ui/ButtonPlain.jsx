import styled from "styled-components";

const ButtonPlain = styled.button`
	cursor: pointer;
	border: none;
    font-size: 16px;
	letter-spacing: 1px;
	transition: 0.3s ease-in-out all;
    color: ${props=> props.active === true ? "var(--COLOR-DARK)" : "var(--COLOR-LIGHT)"};
    font-size: ${props=> props.fontSize};
  
	&:active {
      color: var(--COLOR-LIGHTER);
      font-weight: bolder;
	}
	
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
    font-size: 28px;
    color: var(--COLOR-LIGHT);
    text-align: center;
  }
`


export default ButtonPlain;