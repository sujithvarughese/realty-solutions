import styled from "styled-components";


const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	
	@media (min-width: 600px) {
		gap: 2rem;
	}
`
const Title = styled.div`
	font-weight: 400;
	font-size: 18px;
	text-align: center;
	text-transform: capitalize;
	
	@media (min-width: 600px) {
		font-size: 36px;
	}
`
const Form = ({ title, ...props }) => {
	return (
		<StyledForm {...props}>
			{title && <Title>{title}</Title>}
			{props.children}
		</StyledForm>
	)
}

export default Form;