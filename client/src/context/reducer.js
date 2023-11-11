import { initialState } from "./GlobalContext.jsx";
import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	SET_IS_LOADING,
	SET_USER,
	SET_DATE,
	SET_UNITS
} from "./actions.js";

const reducer = (state, action) => {
	if (action.type === REGISTER_USER) {
		return {
			...state,
			user: action.payload.user,
			lastName: action.payload.lastName,
			firstName: action.payload.firstName
		};
	}
	if (action.type === LOGIN_USER) {
		return {
			...state,
			user: action.payload.user,
		};
	}
	if (action.type === LOGOUT_USER) {
		return {
			...initialState
		};
	}
	if (action.type === SET_IS_LOADING) {
		return {
			...state,
			isLoading: action.payload.isLoading
		}
	}
	if (action.type === SET_USER) {
		return {
			...state,
			user: {
				...state.user,
				lastName: action.payload.lastName,
				firstName: action.payload.firstName,
				unitID: action.payload.unitID,
				street: action.payload.street,
				city: action.payload.city,
				state: action.payload.state,
				zip: action.payload.zip
			}
		}
	}
	if (action.type === SET_DATE) {
		return {
			...state,
			date: action.payload.date
		}
	}
	if (action.type === SET_UNITS) {
		return {
			...state,
			units: action.payload.units
		}
	}

}

export default reducer