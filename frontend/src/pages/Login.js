import {useState} from "react";
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

const initialState = {
    userName: '',
    password: '',
}

export default function Login() {

    const {login, user} = useAuth()
    const [credentials, setCredentials] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()
        setError()
        setLoading(true)
        login(credentials)
            .catch(error => setError(error.response.data.message))
            .finally(setLoading(false))
    }

    const handleCredentialsChanged = event =>
        setCredentials({...credentials, [event.target.name]: event.target.value})

    if (user) {
        return <Redirect to="/main_menu"/>
    }

    return (
        <Page>
            <Header title="Welcome"/>
            {loading && <Loading/>}
            {!loading && (
                <Main as="form" onSubmit={handleSubmit}>
                    <div>
                        <h2>This is the great voting app everybody is talking about!</h2>
                        <h3>Please register if you dont have an account already.</h3>
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

