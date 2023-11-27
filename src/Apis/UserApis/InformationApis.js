import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3006/",
});


export const apiInstance1 = axios.create({
    baseURL: 'http://api1.example.com/',
});

// Create another instance with a different base URL for another API
export const apiInstance2 = axios.create({
    baseURL: 'http://api2.example.com/',
});