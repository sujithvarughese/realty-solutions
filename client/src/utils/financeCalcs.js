
// function to convert to dollar format when returning
const convertToUSD = (number) => {
	return  number.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	})
}

// calculate payoff amount using current data - user can change fields and see what results would be
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

// total profit = rent - property tax - insurance premium - association fees; default term: 1 month
const calculateProfit = ({ annualPropertyTax, annualHomeInsurance, monthlyHoa, monthlyRent, term= 1 }) => {
	const monthlyProfit = monthlyRent - annualPropertyTax/12 - annualHomeInsurance/12 - monthlyHoa
	const profit = monthlyProfit * term
	return convertToUSD(profit)
}


// for financial summary; params: array of financial data for each unit
const totalYearlyPropertyTax = data => convertToUSD(data.reduce((acc, unitFinance) => unitFinance.propertyTax + acc, 0))
const totalYearlyInsurance = data => convertToUSD(data.reduce((acc, unitFinance) => unitFinance.insurance + acc, 0))
const totalMonthlyHoa = data => convertToUSD(data.reduce((acc, unitFinance) => unitFinance.hoa + acc, 0))
const totalRent = data => convertToUSD(data.reduce((acc, unitFinance) => unitFinance.rent + acc, 0))


export { calculatePayoff, calculateMonthlyPayment, calculateProfit, totalYearlyPropertyTax, totalYearlyInsurance, totalMonthlyHoa, totalRent }