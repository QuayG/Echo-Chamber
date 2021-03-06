import Page from "../components/Page";
import TextField from "../components/TextField";
import {useState} from "react";
import Button from "../components/Button";
import {createUser} from "../service/api-service";
import {Link, Redirect} from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {InitialUserState} from "../service/initialStates-service";
import Header from "../components/Header";
import styled from "styled-components/macro";

export default function Register() {

    const [newUserInput, setNewUserInput] = useState(InitialUserState)
    const [createdUser, setCreatedUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const handleNewUserInputChange = event => {
        setNewUserInput({...newUserInput, [event.target.name]: event.target.value})
    }

    const passwordsMatch =
        newUserInput.password === newUserInput.repeatedPassword

    const handleSubmit = event => {
        event.preventDefault()
        setError()
        setLoading(true)
        const user = {
            userName: newUserInput.userName,
            firstName: newUserInput.firstName,
            lastName: newUserInput.lastName,
            password: newUserInput.password
        }
        createUser(user)
            .then(() => setCreatedUser(user))
            .catch(error => setError(error.response.data.error))
            .finally(() => setLoading(false))
    }

    if (createdUser) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Register"/>
            {loading && <Loading/>}
            {!loading &&
            <StyledDiv as="form" onSubmit={handleSubmit}>
                <TextField
                    title="Username"
                    name="userName"
                    value={newUserInput.userName}
                    onChange={handleNewUserInputChange}
                />
                <TextField
                    title="First Name"
                    name="firstName"
                    type="firstName"
                    value={newUserInput.firstName}
                    onChange={handleNewUserInputChange}
                />
                <TextField
                    title="Last Name"
                    name="lastName"
                    type="lastName"
                    value={newUserInput.lastName}
                    onChange={handleNewUserInputChange}
                />
                <TextField
                    title="Password"
                    name="password"
                    type="password"
                    value={newUserInput.password}
                    onChange={handleNewUserInputChange}
                />
                <TextField
                    title="Repeat password"
                    name="repeatedPassword"
                    type="password"
                    value={newUserInput.repeatedPassword}
                    onChange={handleNewUserInputChange}
                />
                <Button disabled={!passwordsMatch}>Register</Button>
                <LoginLink to="/">Back to Login</LoginLink>
            </StyledDiv>
            }
            {error && <Error>{error}</Error>}
        </Page>
    )
}

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
  padding: var(--size-xl);
  margin: 20px;
  height: 100%;
  width: 100%;
  text-align: center;
  

`

const LoginLink = styled(Link)`
    text-decoration: none;
    padding: var(--size-m);
    background: var(--neutral-dark);
    border: 1px solid var(--neutral-light);
    color: var(--neutral-light);
    font-size: var(--size-l);
    border-radius: var(--size-s);
    margin: 10px;

`