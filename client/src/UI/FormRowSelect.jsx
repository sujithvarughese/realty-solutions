import styled from "styled-components";

const StyledFormRowSelect = styled.div`

  padding: 0.4rem 0.7rem;
  border-radius: 5px;
  border: 1px solid var(--COLOR-DARK);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04)
`

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`
const FormRowSelect = ({ label, ...props }) => {

    return (
        <StyledFormRowSelect>
            {label && <Label htmlFor={props.name}>{label}</Label>}
            {props.children}
        </StyledFormRowSelect>
    )
}

export default FormRowSelect