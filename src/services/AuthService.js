import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '../Constants';

class AuthService {
    login(email, password) {
        return axios
        .post(API_URL + "login", { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }    
            return response.data;
        });
    }
    
    logout() {
        return axios
        .post(API_URL + "logout", {}, { headers: this.authHeader() })
        .then(response => {
            if(response.status){
                localStorage.removeItem("token");
            }   
            return response;         
        });
    }

    signup(first_name, last_name, email, password, password_confirmation) {
        return axios
        .post(API_URL + "signup", { first_name, last_name, email, password, password_confirmation })
        .then(response => { 
            return response.data;
        });
    }

    getUserName() {
        const token = localStorage.getItem('token');

        if (token) {
            return jwtDecode(token).firstName;
        }
        return '';
    }

    getUserType() {
        const token = localStorage.getItem('token');

        if (token) {
            return jwtDecode(token).userType;
        }
        return '';
    }

    authHeader() {
        const token = localStorage.getItem('token');
        
        if (token) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }
}

export default new AuthService();