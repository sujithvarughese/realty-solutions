import styled from "styled-components";

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  
  &::after {
    content: "";
    width: 100px;
    height: 100px;
    border: 10px solid var(--COLOR-LIGHTER);
    border-top-color: var(--COLOR-ALT);
    border-radius: 50%;
    animation: loading 0.50s ease-in-out infinite;
    
    @keyframes loading {
      from {
        transform: rotate(0turn);
      }
      to {
        transform: rotate(1turn);
      }
    }
  }
`

export default Loading