import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import { axiosDB } from "../utils/axios.js";
import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	SET_IS_LOADING,
	SET_UNITS
} from "./actions.js";


const initialState = {
	user: null,
	units: null
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const verifyRegistration = async (credentials) => {
		// { email, registrationCode }
		try {
			const response = await axiosDB.patch("/registration/verify", credentials)
			const { user } = response.data
			dispatch({
				type: LOGIN_USER,
				payload: { user }
			})
		} catch (error) {
			console.log(error)
		}
	}

	const login = async (credentials) => {
		// { email, password } = credentials
		try {
			const response = await axiosDB.post("/auth/login", credentials)
			const { user } = response.data
			// const { userID, isAdmin } = user
			dispatch({
				type: LOGIN_USER,
				payload: { user }
			})
		} catch (error) {
			console.log(error);
		}
	}
	const logout = async () => {
		await axiosDB("/auth/logout");
		dispatch({ type: LOGOUT_USER });
	}

	const setIsLoading = (bool) => {
		dispatch({
			type: SET_IS_LOADING,
			payload: { isLoading: bool }
		})
	}
	const setUnits = (units) => {
		dispatch({
			type: SET_UNITS,
			payload: { units: units }
		})
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				verifyRegistration,
				login,
				logout,
				setIsLoading,
				setUnits
			}
		}>

				{ children }

		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, GlobalContext, useGlobalContext, initialState }