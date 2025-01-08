import axios from 'axios';
import { API_URL } from '../Constants';
import AuthService from './AuthService';

class SpotService {    
    filterList(from, to, lat, lng) {
        return axios
        .post(API_URL + "spot/search", {from, to, lat, lng})
        .then(response => {
            return response.data;
        });
    }

    details(id) {
        return axios
        .get(`${API_URL}spot/details`, {
            params: { id }
        })
        .then(response => {
            return response.data;
        });
    }  
    
    getByUser(user_id) {
        return axios
        .get(`${API_URL}spot/user`, {
            params: { user_id },
            headers: AuthService.authHeader(), 
        })
        .then(response => {
            return response.data;
        });
    }

    save(id, user_id, name, lat, lng, rate, description) {
        return axios
        .post(API_URL + "spot", {id, user_id, name, lat, lng, rate, description}, { headers: AuthService.authHeader() })
        .then(response => {
            return response.data;
        });
    }

    delete(id) {
        return axios
        .delete(`${API_URL}spot/${id}`, { headers: AuthService.authHeader() })
        .then(response => {
            return response.data;
        });
    }
}

export default new SpotService();