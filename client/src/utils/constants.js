const prod = {
	url: {
		API_URL: "https://api.sgs-properties.com"
	}
}

const dev = {
	url : {
		API_URL: "http://localhost:3000/api/v1"
	}
}

export const config =
	process.env.NODE_ENV === "development" ? dev : prod
