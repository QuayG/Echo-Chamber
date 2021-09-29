import Page from "../components/Page";
import Header from "../components/Header";
import TextField from "../components/TextField";
import {useState} from "react";
import Button from "../components/Button";
import {createPoll} from "../service/api-service";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import styled from "styled-components/macro";
import {useAuth} from "../auth/AuthProvider";
import {Redirect} from "react-router-dom";
import PossibleAnswerList from "../components/PossibleAnswerList";

export default function CreatePoll() {

    const {user, token} = useAuth()
    const [pollTitle, setPollTitle] = useState('')
    const [answerToAdd, setAnswerToAdd] = useState('')
    const [possibleAnswers, setPossibleAnswers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const handleSubmit = event => {
        const poll = {
            title: pollTitle,
            user: user,
            possibleAnswers: possibleAnswers,
            participants: [],
        }
        event.preventDefault()
        setError()
        setLoading(true)
        createPoll(poll, token)
            .catch(error => setError(error))
            .finally(()=>setLoading(false))
        setPollTitle('')
        setAnswerToAdd('')
        setPossibleAnswers([])
    }

    const handleTitleInputChange = event => {
        setPollTitle(event.target.value)
    }

    const handleAnswerToAddInputChange = event => {
        setAnswerToAdd(event.target.value)
    }

    const addPossibleAnswer = event => {
        event.preventDefault()
        setPossibleAnswers([...possibleAnswers, {possibleAnswer: answerToAdd}])
        setAnswerToAdd('')
    }

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Create Poll"/>
            {loading && <Loading/>}
            {!loading &&
            <Wrapper as="form" onSubmit={handleSubmit}>
                <TextField
                    title="Title"
                    name="title"
                    value={pollTitle}
                    onChange={handleTitleInputChange}
                />

                <PossibleAnswerList possibleAnswers={possibleAnswers}/>

                <TextField
                    title="Answer to add"
                    name="answerToAdd"
                    value={answerToAdd}
                    onChange={handleAnswerToAddInputChange}
                />
                <Button type="button" onClick={addPossibleAnswer}>Add Answer</Button>
                <Button>Save</Button>
            </Wrapper>
            }
            {error && <Error>{error.response.data.error}</Error>}
            <Navbar/>
        </Page>
    )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 10% 40% 10% 10% 10%;
  place-items: center;
  grid-gap: var(--size-xl);
  padding: var(--size-xl);
  margin: var(--size-xl);
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  Button {
    margin: 12px;
  }
`

