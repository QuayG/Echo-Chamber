import Page from "../components/Page";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import {useAuth} from "../auth/AuthProvider";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import {deletePollById, findAllPolls, getTopics} from "../service/api-service";
import "../components/Button";
import Button from "../components/Button";
import styled from "styled-components/macro";
import ReducedPollCard from "../components/ReducedPollCard";
import ListWrapper from "../components/ListWrapper";
import Select from "../components/StyledSelect";
import {InitialPollState} from "../service/initialStates-service";

export default function DeletePolls() {

    const {user, token} = useAuth()
    const [polls, setPolls] = useState([])
    const [error, setError] = useState()
    const [topic, setTopic] = useState("All")
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [selectedPollId, setSelectedPollId] = useState()
    const [filteredPolls, setFilteredPolls] = useState([InitialPollState])


    useEffect(() => {
        setLoading(true)
        setError()
        findAllPolls(token)
            .then(response => setPolls(response))
            .catch(error => setError(error.response.data.error))
            .finally(() => setLoading(false))
        getTopics(token)
            .then(response => setTopics(response.map(topic => topic.name)))
    }, [token, deleted])

    useEffect(event=>{
        console.log(event)
        if (topic === 'All'){
            setFilteredPolls(polls)
        } else {
            setFilteredPolls(polls.filter(poll=>poll.topic.name === topic))
        }
    }, [polls, topic])

    const deletePoll = () => {
        setDeleted(false)
        deletePollById(selectedPollId, token)
            .then(polls => console.log(polls))
            .finally(() => setDeleted(true))
    }

    const select = id => {
        setSelectedPollId(id)
        setDeleted(false)
    }

    if (!user) {
        return <Redirect to="/"/>
    }

    if (user.role !== "admin") {
        return <Redirect to="/"/>
    }

    const handleSelectChange = event => {
        setTopic(event.target.value)
    }

    const activeClassname = poll => {
        if (poll.id === selectedPollId) {
            return "active"
        }
        return ""
    }

    return (
        <Page>
            <Header title="Polls"/>
            <Wrapper>
            <Select
                name="topic"
                value={topic.name}
                values={topics}
                onChange={handleSelectChange}
                title="Filter by topic"
            />
            {loading && <Loading/>}
            {!loading && <ListWrapper>
                {filteredPolls.map(poll => (
                    <li className={activeClassname(poll)}
                        onClick={() => select(poll.id)}
                        key={poll.id}>
                        <ReducedPollCard poll={poll}/>
                    </li>
                ))}
            </ListWrapper>}
            <StyledSection>
                <Button onClick={deletePoll}>Delete</Button>
            </StyledSection>
            </Wrapper>
            {error && <Error>{error}</Error>}
            <Navbar/>
        </Page>
    )
}

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 10% 1fr 10%;
  justify-content: center;
  place-items: center;
  grid-gap: var(--size-m);
  padding: 15px;
  overflow-y: scroll;
`