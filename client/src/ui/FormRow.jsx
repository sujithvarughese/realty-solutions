import styled from "styled-components"

const StyledFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
  align-items: center;
`

const Label = styled.label`
  font-weight: 500;
`

const FormRow = ({ label, ...props }) => {

    return (
        <StyledFormRow>
            {label && <Label htmlFor={props.name}>{label}</Label>}
            {props.children}
        </StyledFormRow>
    )
}
export default FormRow;