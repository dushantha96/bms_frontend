import axios from 'axios';
import { API_URL } from '../Constants';
import AuthService from './AuthService';

class BookingService {    
    book(spot_id, user_id, from, to, hours, rate, total) {
        return axios
        .post(API_URL + "booking/place", {spot_id, user_id, from, to, hours, rate, total}, { headers: AuthService.authHeader() })
        .then(response => {
            return response.data;
        });
    } 
    
    getByUser(user_id) {
        return axios
        .get(`${API_URL}booking/user`, {
            params: { user_id }, 
            headers: AuthService.authHeader(), 
        })
        .then(response => {
            return response.data;
        });
    }
}

export default new BookingService();