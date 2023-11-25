import styled from "styled-components"

const StyledSelect = styled.select`
  min-width: 100%;
  height: 4rem;
  font-size: 24px;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #bcccdc;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
    outline-offset: -1px;
  }
  @media (min-width: 800px) {
      height: 3rem;
      font-size: 16px;
  }
`

const Select = ({ list, ...props }) => {
    return (
        <StyledSelect {...props}>
            {list.map((option, index) =>
                <option value={option.value || option} key={index}>
                    {option.text || option}
                </option>
        )}

        </StyledSelect>
    )
}
export default Select;