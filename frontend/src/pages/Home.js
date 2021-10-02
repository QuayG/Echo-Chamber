import {Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Page from "../components/Page";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import styled from "styled-components/macro";
import {useEffect, useState} from "react";
import {findAllPolls} from "../service/api-service";
import Loading from "../components/Loading";
import Error from "../components/Error";
import {InitialPollState} from "../service/initialStates-service";

export default function Home() {

    const {user, token} = useAuth()
    const [polls, setPolls] = useState([InitialPollState])
    const [donePolls, setDonePolls] = useState([InitialPollState])
    const [yourPolls, setYourPolls] = useState([InitialPollState])
    const [votesOnYourPolls, setVotesOnYourPolls] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        setLoading(true)
        setError()
        findAllPolls(token)
            .then(response => setPolls(response))
            .catch(error => setError(error.response.data.error))
            .finally(() => setLoading(false))
    }, [token])

    useEffect(() => {
        setDonePolls(() => polls.filter(poll => poll.participants.find(participant =>
            participant.userName === user.userName
        )))
        setYourPolls(() => polls.filter(poll => poll.creator.userName === user.userName))
    }, [polls, user])

    useEffect(() => {
        setVotesOnYourPolls(() => {
            let count = 0
            yourPolls.forEach(poll => {
                count += poll.givenAnswers.length
            })
            return count
        })
    }, [yourPolls])

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Home"/>
            {loading && <Loading/>}
            {!loading && (
                <Wrapper>
                    <h1>Hello {user.userName}</h1>
                    <img src="https://thispersondoesnotexist.com/image" alt=""/>
                    <div>
                        <h3>Number of open polls: {polls.length - donePolls.length} </h3>
                        <h3>Number of polls you voted on: {donePolls.length}</h3>
                        <h3>Number of polls you created: {yourPolls.length}</h3>
                        <h3>Number of votes on your polls: {votesOnYourPolls}</h3>
                    </div>
                </Wrapper>
            )
            }
            {error && <Error>{error}</Error>}
            <Navbar/>
        </Page>
    )
}

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 20% 40% 1fr;
  place-items: center;
  justify-items: center;
  
  div {
    display: grid;
    justify-items: center;
  }

  img {
    height: 200px;
    border-radius: 50%;
  }

`