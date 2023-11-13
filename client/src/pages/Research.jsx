import classes from "./styles/Research.module.css";
import { axiosHUD } from "../utils/axios.js";
import { useState } from "react";
import { Form, InputSelect } from "../UI";

const Research = () => {

	const [counties, setCounties] = useState([])
	const [fmrByZip, setFmrByZip] = useState([])
	const [fmrData, setFmrData] = useState(null)

	const [county, setCounty] = useState("")
	const [zip, setZip] = useState("")
	const year = 2023
	// after user selects a state, fetch a list of counties and the county code, then prompt user for county
	const getCountyList = (stateCode) => {
		const fetchData = async () => {
			try {
				// retrieves list of counties { state_code, fips_code, county_name, town_name, category }
				const response = await axiosHUD(`/listCounties/${stateCode}`)
				// we need only county_name to populate list and fips_code to then fetch by code
				const counties = response.data.map(county => {
					return {
						text: county.county_name,
						value: county.fips_code
					}
				})
				// form will only populate list if counties state array length > 0
				setCounties(counties)
			} catch (error) {
				console.log(error);
			}
		}
		fetchData()
	}

	// after user selects county, fetch a list of zip codes(if metro county) with FMR list
	const getZipCodeList = (county) => {
		setCounty(county.text)
		setZip("")
		const fetchData = async () => {
			try {
				// retrieve list { zip_code, Efficiency, One-Bedroom, Two-Bedroom, Three-Bedroom, Four-Bedroom }
				const response = await axiosHUD(`/data/${county.value}?year=${year}`)
				// if classified as small area, data is not seperated by zipcodes
				if (response.data.data.smallarea_status === "0") {
					setFmrData(response.data.data.basicdata)
				} else {
					const zipCodes = response.data.data.basicdata
					// form will only display zip codes to user once state array is populated
					setFmrByZip(zipCodes)
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData()
	}

	const handleChangeStateCode = (e) => {
		// to clear values in case user picks different state after selecting zip
		setFmrByZip([])
		setFmrData(null)
		getCountyList(e.target.value)
	}

	const handleChangeCounty =(e) => {
		setFmrByZip([])
		setFmrData(null)
		const county = counties.find(county => county.value === e.target.value)
		getZipCodeList(county);
	}

	// set our final data to display
	const handleSelectZipCode = (e) => {
		const data = fmrByZip.find(zip => zip.zip_code === e.target.value)
		setZip(e.target.value)
		setFmrData(data)
	}

	return (
		<div>
			<div className={classes.title}>
				Search for Fair Market Rent Values:
			</div>

			<div className={classes.search}>
				<Form>
					<div className={classes.form}>
						<div className={classes.state}>
							<InputSelect
								htmlFor="state"
								label="State: "
								type="text"
								name="state"
								list={states}
								onChange={handleChangeStateCode}
							></InputSelect>
						</div>
						<div className={classes.county}>
							{
								counties.length > 0 &&
								<InputSelect
									htmlFor="county"
									label="County: "
									type="text"
									name="county"
									list={counties}
									onChange={handleChangeCounty}
								></InputSelect>
							}
						</div>
						<div className={classes.zip}>
							{
								fmrByZip?.length > 0 &&
								<InputSelect
									htmlFor="zip"
									label="Zip Code: "
									type="text"
									name="zip"
									list={fmrByZip.map(zip => zip.zip_code)}
									onChange={handleSelectZipCode}
								></InputSelect>
							}
						</div>
					</div>
				</Form>
			</div>


			<div className={classes.results}>
				{
					fmrData &&
					<table className={classes.table}>
						<thead className={classes.thead}>
							<tr className={classes.tr}>
								<th>
									Fair Market Rent Values
									<span className={classes.countyResult}>{` for ${county}`}</span>
									{
										zip &&
										<span className={classes.zipResult}>{`: ${zip}`}</span>
									}

								</th>
							</tr>
						</thead>

						<tbody>
							<tr className={classes.tr}>
								<td className={classes.td}>Efficiency</td>
								<td className={classes.td}>${fmrData["Efficiency"]}</td>
							</tr>
							<tr className={classes.tr}>
								<td className={classes.td}>One-Bedroom</td>
								<td className={classes.td}>${fmrData["One-Bedroom"]}</td>
							</tr>
							<tr className={classes.tr}>
								<td className={classes.td}>Two-Bedroom</td>
								<td className={classes.td}>${fmrData["Two-Bedroom"]}</td>
							</tr>
							<tr className={classes.tr}>
								<td className={classes.td}>Three-Bedroom</td>
								<td className={classes.td}>${fmrData["Three-Bedroom"]}</td>
							</tr>
							<tr className={classes.tr}>
								<td className={classes.td}>Four-Bedroom</td>
								<td className={classes.td}>${fmrData["Four-Bedroom"]}</td>
							</tr>
						</tbody>

					</table>
				}
			</div>

		</div>
	);
};

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

export default Research;