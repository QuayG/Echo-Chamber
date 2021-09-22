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
        user: {},
        participants: [],
    }
]
export default function Polls() {

    const {user, token} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [polls, setPolls] = useState(initialState)

    useEffect(() => {
        if (user) {
            reloadPolls()
        }
    }, [user, token])

    const reloadPolls = ()=>{
        setLoading(true)
        setError()
        findOpenPolls(token)
            .then(polls => setPolls(polls))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Polls"/>
            {loading && <Loading/>}
            {!loading && <PollsList reloadPolls={reloadPolls} polls={polls}/>}
            {error && <Error>{error.response.data.message}</Error>}
            <LinkStyled to="/create">Create new poll</LinkStyled>
            <Navbar/>
        </Page>
    )
}


const LinkStyled = styled(Link)`
  text-decoration: none;
  padding: var(--size-s);
  margin: var(--size-l);
  background: var(--accent);
  border: 1px solid var(--accent);
  color: var(--neutral-light);
  font-size: 1em;
  border-radius: var(--size-s);
`