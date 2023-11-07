import classes from "./styles/Finance.module.css";
import { CreateRentReceiptForm } from "../../components/index.js";
import { useState } from "react";
import { Button } from "../../UI"


const Finance = () => {

	const [showCreateRentReceiptForm, setShowCreateRentReceiptForm] = useState(false)
	console.log(showCreateRentReceiptForm);
	return (
		<div>
			{
				!showCreateRentReceiptForm &&
				<Button onClick={()=>setShowCreateRentReceiptForm(true)}>Create Rent Receipt</Button>
			}

			{
				showCreateRentReceiptForm &&	<CreateRentReceiptForm cancel={()=>setShowCreateRentReceiptForm(false)}/>
			}

		</div>
	);
};

export default Finance;