import {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Main from "../components/Main";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Header from "../components/Header";
import Page from "../components/Page";

const initialState = {
    username: '',
    password: '',
}

export default function Login() {

    const {login, user} = useAuth()
    const [credentials, setCredentials] = useState(initialState)

    const handleSubmit = event => {
        event.preventDefault()
        login(credentials)
    }

    const handleCredentialsChanged = event =>
        setCredentials({...credentials, [event.target.name]: event.target.value})

    if (user) {
        return <Redirect to="/main_menu"/>
    }

    return (
        <Page>
            <Header title="Welcome"/>
            <Main as="form" onSubmit={handleSubmit}>
                <TextField
                    title="Username"
                    name="username"
                    value={credentials.username}
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
        </Page>
    )
}