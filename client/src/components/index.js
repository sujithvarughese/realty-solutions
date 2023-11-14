
import InfoBar from "./navigation/InfoBar.jsx";
import MobileNavbar from "./navigation/MobileNavbar.jsx";
import DesktopNavbar from "./navigation/DesktopNavbar.jsx";

import Auth from "./auth/Auth.jsx"

import Unit from "./units/Unit.jsx";
import CreateUnitForm from "./units/CreateUnitForm.jsx";
import EditUnitForm from "./units/EditUnitForm.jsx";
import SearchUnits from "./units/SearchUnits.jsx";

import CreateMessageForm from "./messages/CreateMessageForm.jsx";
import ReplyMessageForm from "./messages/ReplyMessageForm.jsx";
import MessageExpanded from "./messages/MessageExpanded.jsx";
import MessageCollapsed from "./messages/MessageCollapsed.jsx"
import MessageActions from "./messages/MessageActions.jsx";

import CreateUserForm from "./users/CreateUserForm.jsx";
import EditUserForm from "./users/EditUserForm.jsx";

import CreateRentReceiptForm from "./finance/forms/CreateRentReceiptForm.jsx";
import RentReceipt from "./finance/financials-unit/RentReceipt.jsx"
import EditFinancialsForm from "./finance/forms/EditFinancialsForm.jsx";
import FinancialSummary, { financialSummaryLoader } from "./finance/financials-summary/FinancialSummary.jsx";
import FinancialSummaryTotals from "./finance/financials-summary/FinancialSummaryTotals.jsx";
import FinancialSummaryValues from "./finance/financials-summary/FInancialSummaryValues.jsx";
import UnitFinancials, { unitFinancialsLoader }  from "./finance/financials-unit/UnitFinancials.jsx";
import Rents, { rentsLoader } from "./finance/financials-unit/Rents.jsx";
import CalculatePayoffForm from "./finance/forms/CalculatePayoffForm.jsx";
import CalculateMonthlyPaymentForm from "./finance/forms/CalculateMonthlyPaymentForm.jsx";
import CalculateProfitForm from "./finance/forms/CalculateProfitForm.jsx";

import FinancialsOverview from "./finance/financials-unit/FinancialsOverview.jsx";
import MortgageDetails from "./finance/financials-unit/MortgageDetails.jsx";
import InsuranceDetails from "./finance/financials-unit/InsuranceDetails.jsx";
import HoaDetails from "./finance/financials-unit/HoaDetails.jsx";

export {
	InfoBar,
	MobileNavbar,
	DesktopNavbar,

	Auth,
	Unit,
	CreateUnitForm,
	EditUnitForm,
	SearchUnits,


	CreateMessageForm,
	ReplyMessageForm,
	MessageExpanded,
	MessageCollapsed,
	MessageActions,

	CreateUserForm,
	EditUserForm,

	CreateRentReceiptForm,
	RentReceipt,
	EditFinancialsForm,
	FinancialSummary,
	financialSummaryLoader,
	FinancialSummaryTotals,
	FinancialSummaryValues,
	UnitFinancials,
	CalculatePayoffForm,
	CalculateMonthlyPaymentForm,
	CalculateProfitForm,
	unitFinancialsLoader,

	FinancialsOverview,
	MortgageDetails,
	InsuranceDetails,
	HoaDetails,

	Rents,
	rentsLoader,
}