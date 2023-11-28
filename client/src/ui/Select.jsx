import styled from "styled-components"

const StyledSelect = styled.select`
  line-height: 1;
  padding: 0.5rem;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #bcccdc;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: 4px auto -webkit-focus-ring-color;
    outline-offset: -1px;
  }
  @media (min-width: 600px) {
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