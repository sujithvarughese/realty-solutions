import classes from "./styles/CreateUnitForm.module.css";
import { Button, Form, Input, Select, Card, Modal } from "../../ui";
import { useState } from "react";
import { axiosDB } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

const initialState = {
	houseNumber: "",
	street: "",
	apartmentNumber: "",
	city: "",
	state: "",
	zip: "",
	image: "",
	user: null,
	bedrooms: "",
	bathrooms: "",
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
		<div className={classes.container}>
		<Modal>
		<Card>
		<Form onSubmit={handleSubmit} title="Create Unit">
			<div className={classes.form}>
				<div className={classes.addressLine1}>
					<Input
						htmlFor="houseNumber"
						placeholder="HOUSE NUMBER"
						type="text"
						name="houseNumber"
						value={values.houseNumber}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="street"
						placeholder="STREET"
						type="text"
						name="street"
						value={values.street}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="apartmentNumber"
						placeholder="APARTMENT NUMBER"
						type="text"
						name="apartmentNumber"
						value={values.apartmentNumber}
						onChange={handleChange}
					></Input>
				</div>
				<div className={classes.addressLine2}>
					<Input
						htmlFor="city"
						placeholder="CITY"
						type="text"
						name="city"
						value={values.city}
						onChange={handleChange}
					></Input>
					<Select
						type="text"
						name="state"
						list={states}
						value={values.state}
						onChange={handleChange}
					></Select>
					<Input
						htmlFor="zip"
						placeholder="ZIP"
						type="text"
						name="zip"
						value={values.zip}
						onChange={handleChange}
					></Input>
				</div>
				<div className={classes.info}>
					<Input
						htmlFor="bedrooms"
						placeholder="BEDR"
						type="number"
						min="0"
						name="bedrooms"
						value={values.bedrooms}
						onChange={handleChange}
					></Input>
					<Input
						htmlFor="bathrooms"
						placeholder="BATH"
						type="number"
						min="0"
						name="bathrooms"
						value={values.bathrooms}
						onChange={handleChange}
					></Input>
				</div>
				<div className={classes.imageUpload}>
					<Input
						htmlFor="image"
						label="IMAGE"
						type="file"
						accept=".jpeg, .jpg, .png"
						name="image"
						onChange={e=>handleFileUpload(e)}
					></Input>
				</div>
				<div className={classes.buttons}>
					<Button type="submit">Create Unit</Button>
					<Button type="button" onClick={cancel}>Cancel</Button>
				</div>
			</div>
		</Form>
		</Card>
		</Modal>
		</div>
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