import axios from "axios";
import {getUserToken} from "../../Authentication/UserAuthentication";

const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
};

export default axios.create({
    baseURL: "http://localhost:8080/event/",
    headers: {'Authorization': 'Bearer '+getUserToken()}
});

