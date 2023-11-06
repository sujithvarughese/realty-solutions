import classes from "./styles/CreateUnitForm.module.css";
import { Button, Form, Input, InputSelect, Modal } from "../../UI";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

const initialState = {
	unitID: "",
	street: "",
	city: "",
	state: "",
	zip: 0,
	image: "",
	occupied: false,
	user: null,
	bedrooms: 0,
	bathrooms: 0,
	fairMarketRent: 0
}

const CreateUnitForm = ({ cancel }) => {

	const [values, setValues] = useState(initialState)

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		await createUnit(values)
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
				<Button type="submit">Create Unit</Button>
				<Button type="button" onClick={cancel}>Cancel</Button>
			</div>
		</Form>
		</Modal>
	);
};

const createUnit = async (unit) => {
	console.log(unit);
	try {
		const response = await axiosDB.post('/units', unit)
		console.log(response.data);
	} catch (error) {
		console.log('Unit could not be created');
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

export default CreateUnitForm;