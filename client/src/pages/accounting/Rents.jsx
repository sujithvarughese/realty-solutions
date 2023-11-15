import classes from "./styles/Rents.module.css"
import { useLoaderData } from "react-router-dom";
import { CreateRentReceiptForm, SearchRentReceiptsForm } from "../../components/index.js";
import { useEffect, useState } from "react";
import { RentReceipt } from "../../components/index.js";
import { axiosDB } from "../../utils/axios.js";
import {InputSelect} from "../../UI/index.js";

const Rents = () => {
	const userList = useLoaderData()

	const [rentReceipts, setRentReceipts] = useState([]);
	const [userData, setUserData] = useState(null)
	const [currentLink, setCurrentLink] = useState("search")
	const [tenant, setTenant] = useState(userList[0]?.value)

	const handleSetTenant = async (tenantID) => {
		setTenant(tenantID)
		try {
			const response = await axiosDB(`/auth/getUserInfo/${tenantID}`)
			const { userInfo } = response.data
			setUserData(userInfo)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={classes.container}>

			<div className={classes.tenant}>
				<InputSelect
					htmlFor="tenant"
					label="tenant"
					type="text"
					name="tenant"
					value={tenant}
					list={userList}
					onChange={(e)=>handleSetTenant(e.target.value)}
				></InputSelect>
			</div>

			{
				userData &&
				<div className={classes.links}>
					<div
						className={currentLink === "search" ? classes.active : classes.link}
						onClick={()=>setCurrentLink("search")}
					>
						Search
					</div>
					<div
						className={currentLink === "create" ? classes.active : classes.link}
						onClick={()=>setCurrentLink("create")}
					>
						Create
					</div>
				</div>

			}


			{
				currentLink === "search" &&
				<div className={classes.search}>
					<SearchRentReceiptsForm setRentReceipts={setRentReceipts} tenant={tenant}/>
					<div className={classes.results}>
						{
							rentReceipts?.map(receipt =>
								<RentReceipt
									key={receipt._id}
									{...receipt}
								/>
							)
						}
					</div>
				</div>
			}
			{
				currentLink === "create" &&
				<div className={classes.create}>
					<CreateRentReceiptForm
						user={{_id: tenant, lastName: userInfo.lastName, firstName: userInfo.firstName}}
					/>
				</div>
			}






		</div>
	);
};

export const rentsLoader = async () => {
	try {
		const response = await axiosDB("/auth/getUserList")
		const { userList } = response.data
		return userList
	} catch (error) {
		console.log(error);
	}
}

const years = ["2023", "2022", "2021", "2020"]

const monthsNum = [
	{ text: "January", value: "01" },
	{ text: "February", value: "02" },
	{ text: "March", value: "03" },
	{ text: "April", value: "04" },
	{ text: "May", value: "05" },
	{ text: "June", value: "06" },
	{ text: "July", value: "07" },
	{ text: "August", value: "08" },
	{ text: "September", value: "09" },
	{ text: "October", value: "10" },
	{ text: "November", value: "11" },
	{ text: "December", value: "12" }
];

const months = ["January","February","March","April","May","June","July",
	"August","September","October","November","December"];
export default Rents;