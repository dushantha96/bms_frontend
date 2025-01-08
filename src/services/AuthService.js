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

    signup(first_name, last_name, email, password, password_confirmation, role) {
        return axios
        .post(API_URL + "signup", { first_name, last_name, email, password, password_confirmation, role })
        .then(response => { 
            return response.data;
        });
    }

    getProfile(user_id) {
        return axios
        .get(API_URL + "profile", {
            params: { user_id }, 
            headers: this.authHeader(), 
        })
        .then(response => { 
            return response.data;
        });
    }

    updateProfile(user_id, first_name, last_name, email, current_password, new_password, password_confirmation) {
        return axios
        .post(API_URL + "profile", { user_id, first_name, last_name, email, current_password, new_password, password_confirmation }, { headers: this.authHeader() })
        .then(response => { 
            return response.data;
        });
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');

        return !!token;
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

    getUserId() {
        const token = localStorage.getItem('token');

        if (token) {
            return jwtDecode(token).userId;
        }
        return 0;
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