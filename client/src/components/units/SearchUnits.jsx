import { Input, Button } from "../../UI/index.js";

const SearchUnits = ({ query, setQuery }) => {

	return (
		<Input
			htmlFor="search"
			type="text"
			name="search"
			placeholder="SEARCH UNITS"
			value={query}
			onChange={(e)=>setQuery(e.target.value)}
		></Input>

	);
};

export default SearchUnits;