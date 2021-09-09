import axios from "axios";

export const getToken = credentials =>
    axios
        .post('api/echo-chamber/auth/access_token', credentials)
        .then(response => response.data)
        .then(dto => dto.token)

export const createUser = newUserInput =>
    axios
        .post('api/echo-chamber/user/register', newUserInput)
        .then(response => response.data)