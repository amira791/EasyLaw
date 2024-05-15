import axios from 'axios';

// Premier client Axios
const userApiClient = axios.create({
    baseURL: "http://localhost:8000/user/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Deuxième client Axios
const payementApiClient = axios.create({
    baseURL: "http://localhost:8000/payment/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});



export { userApiClient, payementApiClient };
