import styled from "styled-components";

const ButtonPlain = styled.button`
    cursor: pointer;
    border: none;
    transition: 0.2s ease-in-out all;
    color: inherit;
    background-color: inherit;
    text-decoration: inherit;
    font: inherit;
    font-size: ${props => props.fontSize || "inherit"};
  
    @media (min-width: 600px) {
      &:hover {
        color: var(--COLOR-ALT);
      }
    }

`
export default ButtonPlain;