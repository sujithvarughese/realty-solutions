import classes from "./styles/Finance.module.css";
import { axiosDB } from "../../utils/axios.js";


const Finance = () => {
	return (
		<div>
			Finance
		</div>
	);
};

export const myFinanceLoader = async () => {
	try {
		const response = await axiosDB("/finances")
		const { finances } = response.data
		return finances
	} catch (error) {
		throw new Error(error)
	}
}

export default Finance;