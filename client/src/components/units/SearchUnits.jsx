import { Input, Button } from "../../ui/index.js";

const SearchUnits = ({ query, setQuery }) => {

	return (
		<Input
			type="text"
			name="search"
			placeholder="SEARCH UNITS"
			value={query}
			onChange={(e)=>setQuery(e.target.value)}
		></Input>

	);
};

export default SearchUnits;