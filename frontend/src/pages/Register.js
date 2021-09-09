import Page from "../components/Page";
import Main from "../components/Main";
import TextField from "../components/TextField";
import {useState} from "react";
import Button from "../components/Button";
import {createUser} from "../service/api-service";

const initialState ={
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatedPassword: '',
}

export default function Register(){

    const [newUserInput, setNewUserInput] = useState(initialState)

    const handleNewUserInputChange = event => {
        setNewUserInput({...newUserInput, [event.target.name]: event.target.value})
    }

    const passwordsMatch =
        newUserInput.password === newUserInput.repeatedPassword

    const handleSubmit = () => {
        const user = {
            userName: newUserInput.userName,
            firstName: newUserInput.firstName,
            lastName: newUserInput.lastName,
            password: newUserInput.password
        }
        createUser(user).then(response => console.log(response))
    }

    return(
        <Page>
            <Main as="form" onSubmit={handleSubmit}>
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
            </Main>
        </Page>
    )
}