import {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Main from "../components/Main";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Header from "../components/Header";
import Page from "../components/Page";
import Error from "../components/Error";
import Loading from "../components/Loading";
import styled from "styled-components/macro";
import {InitialUserState, InitialWelcomeInfo} from "../service/initialStates-service";
import {getWelcomeInfo} from "../service/api-service";

export default function Login() {

    const {login, user} = useAuth()
    const [welcomeInfo, setWelcomeInfo] = useState(InitialWelcomeInfo)
    const [credentials, setCredentials] = useState(InitialUserState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        setLoading(true)
        getWelcomeInfo()
            .then(response => setWelcomeInfo(response))
            .finally(() => setLoading(false))
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        setError()
        setLoading(true)
        login(credentials)
            .catch(error => setError(error.response.data.error))
            .finally(setLoading(false))
    }

    const handleCredentialsChanged = event =>
        setCredentials({...credentials, [event.target.name]: event.target.value})

    if (user) {
        return <Redirect to="/home"/>
    }

    return (
        <Page>
            <Header title="Welcome"/>
            {loading && <Loading/>}
            {!loading && (
                <Main as="form" onSubmit={handleSubmit}>
                    <div>
                        <h1>Your vote counts!</h1>
                        <h3>If you don't have an account, click register to sign up and join our worldwide
                            community.</h3>
                    </div>
                    <TextField
                        title="Username"
                        name="userName"
                        value={credentials.userName}
                        onChange={handleCredentialsChanged}
                    />
                    <TextField
                        title="Password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleCredentialsChanged}
                    />
                    <Button>Login</Button>
                    <RegisterLink to="/register">Register</RegisterLink>
                    <div>

                        <h4>Number of users: {welcomeInfo.numberOfUsers}</h4>
                        <h4>Number of polls: {welcomeInfo.numberOfPolls}</h4>
                        <h4>Number of votes: {welcomeInfo.numberOfAnswers}</h4>
                    </div>
                </Main>
            )}
            {error && <Error>{error}</Error>}
        </Page>
    )
}

const RegisterLink = styled(Link)`
  text-decoration: none;
  padding: var(--size-m);
  background: var(--neutral-dark);
  border: 1px solid var(--neutral-light);
  color: var(--neutral-light);
  font-size: var(--size-l);
  border-radius: var(--size-s);
  margin: 10px;
`

