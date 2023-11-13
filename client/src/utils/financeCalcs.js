
// function to convert to dollar format when returning
const convertToUSD = (number) => {
	return  number.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	})
}

const calculatePayoff = ({ principal, apr, termYears, paymentsMade }) => {
	const interest = (apr/100) / 12
	const term = termYears * 12
	const result = principal * ((1 + interest) ** term  - (1 + interest) ** paymentsMade) / ((1 + interest) ** term - 1)
	return convertToUSD(result)
}

const calculateMonthlyPayment =  ({ principal, apr, termYears }) => {

	const interest = (apr/100)
	const term = termYears * 12
	const payment =  principal * (interest * (1 + interest) ** term) / ((1 + interest) ** term - 1)
	return convertToUSD(payment)
}

const calculateProfit = ({ annualPropertyTax, annualHomeInsurance, monthlyHoa, monthlyRent, term= 1 }) => {

	const monthlyProfit = monthlyRent - annualPropertyTax/12 - annualHomeInsurance/12 - monthlyHoa
	const profit = monthlyProfit * term
	return convertToUSD(profit)
}


export { calculatePayoff, calculateMonthlyPayment, calculateProfit }