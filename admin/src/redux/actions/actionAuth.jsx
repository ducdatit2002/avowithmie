import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants/constantAuth';
import { https } from '../../services/configURL'; // Adjust the path as necessary

export const login = (email, password) => async (dispatch) => {
    try {
        const body = JSON.stringify({ email, password });
        const response = await https.post('/login', body);
        
        console.log("API response data:", response.data);  // Log to check the response structure

        // Adjust the property access according to your actual API response structure
        const token = response.data.token; // Adjust this based on your server's response

        if (!token) {
            throw new Error("Token not received from the server");
        }

        localStorage.setItem('x-auth-token', token);
        
        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
        console.error("Login Error:", error);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response ? error.response.data.message : "Login failed due to server error"
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('x-auth-token');
    dispatch({ type: LOGOUT });
};
