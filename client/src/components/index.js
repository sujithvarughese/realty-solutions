
import InfoBar from "./navigation/InfoBar.jsx";
import MobileNavbar from "./navigation/MobileNavbar.jsx";
import DesktopNavbar from "./navigation/DesktopNavbar.jsx";

import Auth from "./auth/Auth.jsx"

import Unit from "./units/Unit.jsx";
import CreateUnitForm from "./units/CreateUnitForm.jsx";
import EditUnitForm from "./units/EditUnitForm.jsx";
import SearchUnits from "./units/SearchUnits.jsx";
import UnitMobile from "./units/UnitMobile.jsx";

import CreateMessageForm from "./messages/CreateMessageForm.jsx";
import ReplyMessageForm from "./messages/ReplyMessageForm.jsx";
import MessageExpanded from "./messages/MessageExpanded.jsx";
import MessageCollapsed from "./messages/MessageCollapsed.jsx"
import MessageActions from "./messages/MessageActions.jsx";
import MessageContents from "./messages/MessageContents.jsx";

import CreateUserForm from "./users/CreateUserForm.jsx";
import EditUserForm from "./users/EditUserForm.jsx";

import SearchRentReceiptsForm from "./finance/forms/SearchRentReceiptsForm.jsx";
import CreateRentReceiptForm from "./finance/forms/CreateRentReceiptForm.jsx";
import RentReceipt from "./finance/financials-unit/RentReceipt.jsx"
import EditFinancialsForm from "./finance/forms/EditFinancialsForm.jsx";
import FinancesTotalCalculated from "./finance/financials-total/FinancesTotalCalculated.jsx";
import FinancesTotalUnitValues from "./finance/financials-total/FinancesTotalUnitValues.jsx";
import FinancesUnit, { unitFinancialsLoader }  from "../pages/accounting/FinancesUnit.jsx";
import CalculatePayoffForm from "./finance/forms/CalculatePayoffForm.jsx";
import CalculateMonthlyPaymentForm from "./finance/forms/CalculateMonthlyPaymentForm.jsx";
import CalculateProfitForm from "./finance/forms/CalculateProfitForm.jsx";

import FinanceDetails from "./finance/financials-unit/FinanceDetails.jsx";
import MortgageDetails from "./finance/financials-unit/MortgageDetails.jsx";
import InsuranceDetails from "./finance/financials-unit/InsuranceDetails.jsx";
import HoaDetails from "./finance/financials-unit/HoaDetails.jsx";
import FinancesTotalMobile from "../pages/accounting/FinancesTotalMobile.jsx";
import RentDetails from "./finance/financials-unit/RentDetails.jsx";

export {
	InfoBar,
	MobileNavbar,
	DesktopNavbar,

	Auth,
	Unit,
	UnitMobile,

	CreateUnitForm,
	EditUnitForm,
	SearchUnits,

	CreateMessageForm,
	ReplyMessageForm,
	MessageExpanded,
	MessageCollapsed,
	MessageActions,
	MessageContents,

	CreateUserForm,
	EditUserForm,

	SearchRentReceiptsForm,
	CreateRentReceiptForm,
	RentReceipt,
	EditFinancialsForm,
	FinancesTotalCalculated,
	FinancesTotalUnitValues,
	FinancesUnit,
	CalculatePayoffForm,
	CalculateMonthlyPaymentForm,
	CalculateProfitForm,
	unitFinancialsLoader,

	FinanceDetails,
	MortgageDetails,
	InsuranceDetails,
	HoaDetails,
	FinancesTotalMobile,
	RentDetails
}