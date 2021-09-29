import Page from "../components/Page";
import Header from "../components/Header";
import styled from "styled-components/macro";
import {useAuth} from "../auth/AuthProvider";
import {Link, Redirect} from "react-router-dom";
import Navbar from "../components/Navbar";
import {useEffect, useState} from "react";
import {findOpenPolls} from "../service/api-service";
import Loading from "../components/Loading";
import Error from "../components/Error";
import PollsList from "../components/PollsList";


const initialState = [
    {
        title: "",
        givenAnswers: [],
        possibleAnswers: [
            {
                id: "",
                possibleAnswer: "",
            }
        ],
        creator: {},
        participants: [],
    }
]
export default function Polls() {

    const {user, token} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [polls, setPolls] = useState(initialState)

    useEffect(() => {
        setLoading(true)
        setError()
        findOpenPolls(token)
            .then(polls => setPolls(polls))
            .catch(error => setError(error.response.data.message))
            .finally(() => setLoading(false))
    }, [token])

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Polls"/>
            {loading && <Loading/>}
            {!loading && <PollsList setPolls={setPolls} polls={polls}/>}
            {error && <Error>{error}</Error>}
            <CreatePollLink to="/create">Create new poll</CreatePollLink>
            <Navbar/>
        </Page>
    )
}

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