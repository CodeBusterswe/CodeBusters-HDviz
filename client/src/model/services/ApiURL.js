import axios from "axios";
export const api=axios.create({
	baseURL:process.env.NODE_ENV==="production"?"remote_api_URL":"/api/data",
	headers:{
		"Content-Type": "application/json"
	}
});
export default api;