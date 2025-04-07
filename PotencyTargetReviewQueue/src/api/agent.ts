import axios from "axios";

/*const baseUrl = ""*/
const API_ID = "ascavone@nctl.com";
const API_KEY = "fYj0KN18PVA$G!4N";

export const getAuthToken = () => {
    return btoa(`${API_ID}:${API_KEY}`);
};
export const getAuthHeaders = () => ({
    Authorization: `Basic ${getAuthToken()}`,
    "Content-Type": "application/json",
    Accept: "application/json",
});

const agent = {
    get: async <T>(url: string, params?: object): Promise<T> => {
        const response = await axios.get<T>(url, {
            headers: getAuthHeaders(),
            params
        });
        return response.data;
    },
    post: async <T>(url: string, payLoad?: object): Promise<T> => {
        const response = await axios.post<T>(url, payLoad, {
            headers: getAuthHeaders()
        });
        return response.data;
    }
}
export default agent;