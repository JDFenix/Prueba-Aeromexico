import axios from "axios";

export const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
})

export const api_json_server = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
})

