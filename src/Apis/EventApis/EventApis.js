import axios from "axios";

// const config = {
//     headers: { Authorization: `Bearer ${getUserToken()}` }
// };

export default axios.create({
    baseURL: "http://localhost:8080/event/",
    // headers: {'Authorization': 'Bearer '+getUserToken()}
});

