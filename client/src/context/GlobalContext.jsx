import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import { axiosDB } from "../utils/axios.js";
import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	SET_IS_LOADING,
	SET_USER,
	SET_DATE
} from "./actions.js";


const initialState = {
	date: Date.now(),
	user: null
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)


	const register = async (credentials) => {
		try {
			const response = await axiosDB.post("/auth/register", credentials)
			// user = { userID: _id, isAdmin: isAdmin }
			const { user, lastName, firstName } = response.data
			dispatch({
				type: REGISTER_USER,
				payload: { user, lastName, firstName }
			})

		} catch (error) {
			console.log(error);
		}

	}
	const login = async (credentials) => {
		try {
			const response = await axiosDB.post("/auth/login", credentials)
			const { user, lastName, firstName } = response.data
			dispatch({
				type: LOGIN_USER,
				payload: { user, lastName, firstName }
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
	const setUser = (user) => {
		const { lastName, firstName, unitID, street, city, state, zip } = user
		dispatch({
			type: SET_USER,
			payload: { lastName, firstName, unitID, street, city, state, zip }
		})
	}

	const setDate = () => {
		const dateInstance = new Date()
		const year = dateInstance.getFullYear()
		const month = dateInstance.getMonth()
		const date = dateInstance.getDate()
		const day = dateInstance.getDay()
		const today = { year, month, date, day }
		dispatch({
			type: SET_DATE,
			payload: { date: today }
		})
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				register,
				login,
				logout,
				setIsLoading,
				setDate,
				setUser
			}
		}>

				{ children }

		</GlobalContext.Provider>
	)
}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, GlobalContext, useGlobalContext, initialState }