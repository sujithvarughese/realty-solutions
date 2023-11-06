import classes from "./styles/EditUnitForm.module.css";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import { Button, Form, Input, InputSelect, Modal } from "../../UI/index.js";
import { useNavigate } from "react-router-dom";

// combine with CreateUnitForm to clean
const EditUnitForm = ({ cancel, unit }) => {
	// pre-fill fields with current unit values
	const [values, setValues] = useState(unit)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		await editUnit(values)
		// navigate back to units page to render changes
		navigate("/units");
		// close form
		cancel()
	}

	const handleFileUpload = async (e) => {
		// file selected by user
		const file = e.target.files[0]
		// convert file to base64 format to store in MongoDB
		const base64 = await convertToBase64(file)
		setValues({ ...values, image: base64})
	}

	return (
		<Modal>
			<Form onSubmit={handleSubmit} title="create unit">
				<div className={classes.form}>
					<div className={classes.addressLine1}>
						<Input
							htmlFor="unitID"
							label="unit: "
							type="text"
							name="unitID"
							value={values.unitID}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="street"
							label="street: "
							type="text"
							name="street"
							value={values.street}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.addressLine2}>
						<Input
							htmlFor="city"
							label="city: "
							type="text"
							name="city"
							value={values.city}
							onChange={handleChange}
						></Input>
						<InputSelect
							htmlFor="state"
							label="state: "
							type="text"
							name="state"
							list={states}
							value={values.state}
							onChange={handleChange}
						></InputSelect>
						<Input
							htmlFor="zip"
							label="zip: "
							type="number"
							name="zip"
							value={values.zip}
							onChange={handleChange}
						></Input>
					</div>
					<div className={classes.info}>
						<Input
							htmlFor="image"
							label="image: "
							type="file"
							accept=".jpeg, .jpg, .png"
							name="image"
							onChange={e=>handleFileUpload(e)}
						></Input>
						<InputSelect
							htmlFor="occupied"
							label="occupied: "
							type="boolean"
							name="occupied"
							list={[{text: "Yes", value: true}, {text: "No", value: false}]}
							value={values.occupied}
							onChange={handleChange}
						></InputSelect>
						<Input
							htmlFor="bedrooms"
							label="bedrooms: "
							type="number"
							min="0"
							name="bedrooms"
							value={values.bedrooms}
							onChange={handleChange}
						></Input>
						<Input
							htmlFor="bathrooms"
							label="bathrooms: "
							type="number"
							min="0"
							name="bathrooms"
							value={values.bathrooms}
							onChange={handleChange}
						></Input>
					</div>


				</div>
				<div>
					<Button type="submit">Update Unit</Button>
					<Button type="button" onClick={cancel}>Cancel</Button>
				</div>
			</Form>
		</Modal>
	);
};

const editUnit = async (updatedUnit) => {
	try {
		const response = await axiosDB.patch("/units", updatedUnit)
		console.log(response.data);
	} catch (error){
		console.log(error);
	}
}
// convert file to base64 to store in database
const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			resolve(fileReader.result)
		}
		fileReader.onerror = (error) => {
			reject(error)
		}
	})
}
const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default EditUnitForm;