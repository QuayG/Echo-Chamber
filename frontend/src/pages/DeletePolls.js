import Page from "../components/Page";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import {useAuth} from "../auth/AuthProvider";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import {deletePollById, findAllPolls} from "../service/api-service";
import "../components/Button";
import Button from "../components/Button";
import styled from "styled-components/macro";
import ReducedPollCard from "../components/ReducedPollCard";
import ListWrapper from "../components/ListWrapper";

export default function DeletePolls() {

    const {user, token} = useAuth()
    const [polls, setPolls] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [selectedPollId, setSelectedPollId] = useState()

    useEffect(() => {
        setLoading(true)
        setError()
        findAllPolls(token)
            .then(response => setPolls(response))
            .catch(error => setError(error.response.data.error))
            .finally(() => setLoading(false))
    }, [token, deleted])

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

    const activeClassname = poll => {
        if (poll.id === selectedPollId) {
            return "active"
        }
        return ""
    }

    return (
        <Page>
            <Header title="Polls"/>
            {loading && <Loading/>}
            {!loading && <ListWrapper>
                {polls.map(poll => (
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
            {error && <Error>{error}</Error>}
            <Navbar/>
        </Page>
    )
}

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
`