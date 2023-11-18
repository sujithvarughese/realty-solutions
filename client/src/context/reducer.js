import { initialState } from "./GlobalContext.jsx";
import {
	LOGIN_USER,
	LOGOUT_USER,
	SET_IS_LOADING,
	SET_UNITS
} from "./actions.js";

const reducer = (state, action) => {
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
	if (action.type === SET_UNITS) {
		return {
			...state,
			units: action.payload.units
		}
	}

}

export default reducer