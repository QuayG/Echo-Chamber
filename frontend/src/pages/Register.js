import Page from "../components/Page";
import Main from "../components/Main";
import TextField from "../components/TextField";
import {useState} from "react";
import Button from "../components/Button";
import {createUser} from "../service/api-service";

const initialState ={
    username: '',
    password: '',
    repeatedPassword: '',
}

export default function Register(){

    const [newUserInput, setNewUserInput] = useState(initialState)

    const handleNewUserInputChange = event => {
        setNewUserInput({...newUserInput, [event.target.name]: event.target.value})
    }

    const handleSubmit = () => {
        createUser(newUserInput)
    }

    return(
        <Page>
            <Main as="form" onSubmit={handleSubmit}>
                <TextField
                title="Username"
                name="username"
                value={newUserInput.username}
                onChange={handleNewUserInputChange}
                />
                <TextField
                title="Password"
                name="password"
                value={newUserInput.password}
                onChange={handleNewUserInputChange}
                />
                <TextField
                title="Repeat password"
                name="repeatedPassword"
                value={newUserInput.repeatedPassword}
                onChange={handleNewUserInputChange}
                />
                <Button>Register</Button>
            </Main>
        </Page>
    )
}