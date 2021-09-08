import axios from "axios";

export const getToken = credentials =>
    axios
        .post('api/echo-chamber/auth/access_token', credentials)
        .then(response => response.data)
        .then(dto => dto.token)
