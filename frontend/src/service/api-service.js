import axios from "axios";

export const getToken = credentials =>
    axios
        .post('api/echo-chamber/auth/access_token', credentials)
        .then(response => response.data)
        .then(dto => dto.token)

const getAuthHeaders = token => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const createUser = newUserInput =>
    axios
        .post('api/echo-chamber/user/register', newUserInput)
        .then(response => response.data)

export const createPoll = (poll, token) => {
    return axios
        .post('/api/echo-chamber/polls/create', poll, getAuthHeaders(token))
        .then(response => response.data)
}

export const findAll = (token) =>
    axios
        .get('api/echo-chamber/polls', getAuthHeaders(token))
        .then(response => response.data)