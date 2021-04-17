import axios from "axios";
const url="http://localhost:5000/api/data";
export const api=axios.create({
	baseURL:url,
	headers:{
		"Accept":"application/json",
		"Content-Type": "application/json"
	}
});
export default api;
