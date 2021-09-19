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
import AnswerList from "../components/AnswerList";

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
            {!loading &&
            <PollsList>
                {polls && polls.map(poll => (
                    <li key={poll.title}>
                        <h3>{poll.title}</h3>
                        <AnswerList possibleAnswers={poll.possibleAnswers}/>
                        <p>No. of participants: {poll.givenAnswers.length}</p>
                        <p>Created by: {poll.user.userName}</p>
                    </li>
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

  li {
    margin: 20px;
    justify-items: center;
    align-items: center;
    width: inherit;
    display: grid;
    grid-template-rows: 20% 60% 10% 10%;
    border: 1px solid var(--accent);
    border-radius: var(--size-s);

    ul {
      width: 260px;
      margin: 0;
      padding: 0;

      li {
        justify-content: center;
        width: auto;
        margin: 15px;
        padding: 15px;
      }
    }

    Button {
      display: block;
      width: 50%;
      margin: 10px;
      text-align: center;
    }
  }

  li.active {
    color: var(--accent);
  }

`
