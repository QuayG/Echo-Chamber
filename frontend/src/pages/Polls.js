import Page from "../components/Page";
import Header from "../components/Header";
import styled from "styled-components/macro";
import {useAuth} from "../auth/AuthProvider";
import {Link, Redirect} from "react-router-dom";
import Navbar from "../components/Navbar";
import {useEffect, useState} from "react";
import {findOpenPolls, getTopics} from "../service/api-service";
import Loading from "../components/Loading";
import Error from "../components/Error";
import PollsList from "../components/PollsList";
import {InitialPollState} from "../service/initialStates-service";
import Select from "../components/StyledSelect";

export default function Polls() {

    const {user, token} = useAuth()
    const [loading, setLoading] = useState(false)
    const [topic, setTopic] = useState("All")
    const [topics, setTopics] = useState([])
    const [error, setError] = useState()
    const [polls, setPolls] = useState([InitialPollState])
    const [filteredPolls, setFilteredPolls] = useState([InitialPollState])

    useEffect(() => {
        setLoading(true)
        setError()
        findOpenPolls(token)
            .then(polls => setPolls(polls))
            .catch(error => setError(error.response.data.error))
            .finally(() => setLoading(false))
        getTopics(token)
            .then(response => setTopics(response.map(topic => topic.name)))
    }, [token])

    useEffect(event=>{
        console.log(event)
        if (topic === 'All'){
            setFilteredPolls(polls)
        } else {
        setFilteredPolls(polls.filter(poll=>poll.topic.name === topic))
        }
    }, [polls, topic])

    const handleSelectChange = event => {
        setTopic(event.target.value)
    }

    if (!user) {
        return <Redirect to="/"/>
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
                {!loading && <PollsList setPolls={setPolls} polls={filteredPolls}/>}
                <CreatePollLink to="/create">Create new poll</CreatePollLink>
            </Wrapper>
            {error && <Error>{error}</Error>}
            <Navbar/>
        </Page>
    )
}

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

const CreatePollLink = styled(Link)`
  text-decoration: none;
  padding: var(--size-m);
  background: var(--neutral-dark);
  border: 1px solid var(--neutral-light);
  color: var(--neutral-light);
  font-size: var(--size-l);
  border-radius: var(--size-s);
  margin: 10px;
`