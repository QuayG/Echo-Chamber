import Page from "../components/Page";
import Header from "../components/Header";
import styled from "styled-components/macro";
import {useAuth} from "../auth/AuthProvider";
import {Link, Redirect} from "react-router-dom";
import Navbar from "../components/Navbar";
import {useEffect, useState} from "react";
import {findAll} from "../service/api-service";
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
    }
]

export default function Polls() {

    const {user, token} = useAuth()
    const [polls, setPolls] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        if (token) {
            setError()
            setLoading(true)
            findAll(token).then(setPolls).catch(error => {
                setError(error)
            })
            setLoading(false)
        }
    }, [token, user])

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Polls"/>
            {loading && <Loading/>}
            {!loading && <PollsList polls={polls}/>}
            {error && <Error>{error}</Error>}
            <LinkStyled to="/create">Polls</LinkStyled>
            <Navbar/>
        </Page>
    )
}


const LinkStyled = styled(Link)`
  text-decoration: none;
  padding: var(--size-s);
  background: var(--accent);
  border: 1px solid var(--accent);
  color: var(--neutral-light);
  font-size: 1em;
  border-radius: var(--size-s);
  margin: 1px;
`