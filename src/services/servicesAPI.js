import { API_URL } from "../config";
import axios from "axios";

export async function getDatas() {
    try {
        const url = `${API_URL}`;
        const response = await axios.get(url);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        return null
    }
}