import axios from 'axios';
import { API_URL } from '../Constants';

class SpotService {    
    filterList(from, to, lat, lng) {
        return axios
        .post(API_URL + "filter/list", {from, to, lat, lng})
        .then(response => {
            return response.data;
        });
    }

    filterMap(from, to, lat, lng) {
        return axios
        .post(API_URL + "filter/map", {from, to, lat, lng})
        .then(response => {
            return response.data;         
        });
    }
    
}

export default new SpotService();