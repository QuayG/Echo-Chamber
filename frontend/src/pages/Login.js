import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Main from "../components/Main";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Header from "../components/Header";
import Page from "../components/Page";
import Error from "../components/Error";
import Loading from "../components/Loading";

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
        login(credentials).catch(error => {
            setError(error)
            setLoading(false)
        })
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
                    <NavLink to="/register">Register</NavLink>
                </Main>
            )}
            {error && <Error>{error.message}</Error>}
        </Page>
    )
}