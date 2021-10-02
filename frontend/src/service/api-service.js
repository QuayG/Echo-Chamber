import axios from "axios";

export const getToken = credentials =>
    axios
        .post('/api/echo-chamber/auth/access_token', credentials)
        .then(response => response.data)
        .then(dto => dto.token)

const getAuthHeaders = token => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const createUser = newUserInput =>
    axios
        .post('/api/echo-chamber/user/register', newUserInput)
        .then(response => response.data)

export const createPoll = (poll, token) => {
    return axios
        .post('/api/echo-chamber/polls', poll, getAuthHeaders(token))
        .then(response => response.data)
}

export const findPollById = (pollId, token) =>
    axios
        .get(`/api/echo-chamber/polls/${pollId}`, getAuthHeaders(token))
        .then(response => response.data)

export const getTopics = token =>
    axios
        .get('/api/echo-chamber/polls/topics', getAuthHeaders(token))
        .then(response=>response.data)

export const findAllPolls = token =>
    axios
        .get('/api/echo-chamber/polls', getAuthHeaders(token))
        .then(response => response.data)

export const getWelcomeInfo = () =>
    axios
        .get('/api/echo-chamber/polls/info', null)
        .then(response => response.data)

export const findOpenPolls = token =>
    axios
        .get('/api/echo-chamber/polls/open', getAuthHeaders(token))
        .then(response => response.data)

export const findDonePolls = token =>
    axios
        .get('/api/echo-chamber/polls/done', getAuthHeaders(token))
        .then(response => response.data)

export const giveAnswer = (selectedAnswerId, token) => {
    return axios
        .post(`/api/echo-chamber/polls/answer/${selectedAnswerId}`, null, getAuthHeaders(token))
        .then(() => findOpenPolls(token))
}

export const deletePollById = (pollId, token) => {
    return axios
        .delete(`/api/echo-chamber/polls/${pollId}`, getAuthHeaders(token))
        .then(() => findAllPolls(token))
        .then(response => response.data)
}