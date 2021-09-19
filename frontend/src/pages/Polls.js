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
import Poll from "../components/Poll";

const initialState = [
    {
        title: "",
        givenAnswers: [],
        possibleAnswers: [],
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
                setLoading(false)
            })
        }
    }, [token, user])

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Polls"/>
            {loading && <Loading/>}
            {!loading &&
            <PollsList>
                {polls.map(poll => (
                    <Poll poll={poll}/>
                ))}
            </PollsList>
            }
            {error && <Error>{error}</Error>}
            <LinkStyled to="/create">Polls</LinkStyled>
            <Navbar/>
        </Page>
    )
}


const LinkStyled = styled(Link)`
  text-decoration: none;
  padding: var(--size-m);
  background: var(--accent);
  border: 1px solid var(--accent);
  color: var(--neutral-light);
  font-size: 1em;
  border-radius: var(--size-s);
  margin: 10px;
`

const PollsList = styled.ul`
  padding: 0 5px;
  height: 90%;
  width: 90%;
  display: flex;
  list-style-type: none;
  text-decoration: none;
  color: var(--neutral-light);
  font-size: 1em;
  text-align: center;
  align-content: center;
  overflow-x: scroll;

  li.active {
    color: var(--accent);
  }

`
