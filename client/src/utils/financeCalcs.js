
const calculatePayoff = (principal, apr, term, paymentsMade) => {
	const interest = apr / 12
   return principal * ((1 + interest) ** term  - (1 + interest) ** paymentsMade) / ((1 + interest) ** term - 1)
}

const calcMonthlyPayment =  (principal, apr, term, paymentsMade) => {
	const interest = apr / 12
	return principal * (interest * (1 + interest) ** term) / ((1 + interest) ** term - 1)
}

const calcProfit = (propertyTax, homeInsurance, hoa, rent, term=12) => {
	const termProfit = rent * term - (propertyTax + homeInsurance + hoa)
	const yearly = rent * 12 - (propertyTax + homeInsurance + hoa)
	const monthly = yearly / 12
	return { termProfit, yearly, monthly }
}

const principal = 500000
const apr = .055
const term = 360
const paymentsMade = 1

const payoff = calculatePayoff(principal, apr, term, paymentsMade)
const payment = calcMonthlyPayment(principal, apr, term, paymentsMade)
console.log(payoff);
console.log(payment);