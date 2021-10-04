import Page from "../components/Page";
import Header from "../components/Header";
import TextField from "../components/TextField";
import {useEffect, useState} from "react";
import Button from "../components/Button";
import {createPoll, getTopics} from "../service/api-service";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import styled from "styled-components/macro";
import {useAuth} from "../auth/AuthProvider";
import {Redirect} from "react-router-dom";
import PossibleAnswerList from "../components/PossibleAnswerList";
import Select from "../components/StyledSelect";

export default function CreatePoll() {

    const {user, token} = useAuth()
    const [pollTitle, setPollTitle] = useState('')
    const [topic, setTopic] = useState('')
    const [topics, setTopics] = useState([''])
    const [answerToAdd, setAnswerToAdd] = useState('')
    const [possibleAnswers, setPossibleAnswers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        getTopics(token)
            .then(response => setTopics(response.map(topic=>topic.name)))
    }, [token])

    const handleSubmit = event => {
        const poll = {
            title: pollTitle,
            topic: {
                name: topic
            },
            user: user,
            possibleAnswers: possibleAnswers,
            participants: [],
        }
        event.preventDefault()
        setError()
        setLoading(true)
        createPoll(poll, token)
            .catch(error => setError(error))
            .finally(() => setLoading(false))
        setPollTitle('')
        setAnswerToAdd('')
        setPossibleAnswers([])
    }

    const handleSelectChange = event => {
        event.preventDefault()
        setTopic(event.target.value)
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

    const removePossibleAnswer = answerToRemove =>{
        setPossibleAnswers(possibleAnswers.filter(answer => answer.possibleAnswer !== answerToRemove))
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

                <Select
                    values={topics}
                    create={true}
                    onChange={handleSelectChange}
                    title="Select Topic"
                />

                <TextField
                    title="Answer to add"
                    name="answerToAdd"
                    value={answerToAdd}
                    onChange={handleAnswerToAddInputChange}
                />
                <Button type="button" onClick={addPossibleAnswer}>Add Answer</Button>
                <PossibleAnswerList possibleAnswers={possibleAnswers} removePossibleAnswer={removePossibleAnswer}/>
                <Button type="submit">Save</Button>
            </Wrapper>
            }
            {error && <Error>{error.response.data.error}</Error>}
            <Navbar/>
        </Page>
    )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 26% 1fr;
  place-items: center;
  grid-gap: var(--size-m);
  padding: var(--size-l);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`