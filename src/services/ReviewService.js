import axios from "axios";
import { API_URL } from "../Constants";
import AuthService from "./AuthService";

class ReviewService {
  rate(spot_id, user_id, rating, comment) {
    return axios
      .post(
        API_URL + "review/rate",
        { spot_id, user_id, rating, comment },
        { headers: AuthService.authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  top() {
    return axios.get(`${API_URL}review/top`).then((response) => {
      return response.data;
    });
  }
}

export default new ReviewService();
