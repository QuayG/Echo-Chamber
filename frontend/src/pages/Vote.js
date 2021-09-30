import {useParams} from "react-router-dom";
import Header from "../components/Header";
import PollCard from "../components/PollCard";
import Navbar from "../components/Navbar";
import {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {findPollById, giveAnswer} from "../service/api-service";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Page from "../components/Page";
import {InitialPollState} from "../service/initialStates-service";

export default function Vote() {

    const {token} = useAuth()
    const {pollId} = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [poll, setPoll] = useState(InitialPollState)

    const vote = (selectedAnswerId) => {
        return giveAnswer(selectedAnswerId, token)
            .catch(error=>setError(error.response.data.error))
    }

    useEffect(() => {
        setLoading(true)
        setError()
        findPollById(pollId, token)
            .then(poll => setPoll(poll))
            .catch(error => setError(error.response.data.message))
            .finally(() => setLoading(false))
    }, [pollId, token])


    return (
        <Page>
            <Header title="Vote"/>
            {loading && <Loading/>}
            {!loading && token && <PollCard poll={poll} vote={vote}/>}
            {error && <Error>{error}</Error>}
            <Navbar/>
        </Page>
    )
}