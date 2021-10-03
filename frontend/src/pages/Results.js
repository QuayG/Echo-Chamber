import Page from "../components/Page";
import Header from "../components/Header";
import {useAuth} from "../auth/AuthProvider";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import {findDonePolls, getTopics} from "../service/api-service";
import ResultsList from "../components/ResultsList";
import {InitialPollState} from "../service/initialStates-service";
import Select from "../components/StyledSelect";
import styled from "styled-components/macro";

export default function Results() {

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
        findDonePolls(token)
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
            <Header title="Results"/>
            <Wrapper>
                <Select
                    name="topic"
                    value={topic.name}
                    values={topics}
                    onChange={handleSelectChange}
                    title="Filter by topic"
                />
                {loading && <Loading/>}
                {!loading && <ResultsList polls={filteredPolls}/>}
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
  grid-template-rows: 10% 1fr;
  justify-content: center;
  place-items: center;
  grid-gap: var(--size-m);
  padding: 15px;
  overflow-y: scroll;
`