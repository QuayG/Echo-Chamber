import BarChart from "../components/BarChart";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Page from "../components/Page";
import {Redirect, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {findPollById} from "../service/api-service";
import Error from "../components/Error";
import {useAuth} from "../auth/AuthProvider";

export default function Result() {

    const {pollId} = useParams()
    const {user, token} = useAuth()
    const [poll, setPoll] = useState()
    const [error, setError] = useState()
    const [voted, setVoted] = useState(false)

    useEffect(()=>{
        findPollById(pollId, token)
            .then(poll=>setPoll(poll))
            .then(()=> setVoted(true))
            .catch(error=>setError(error.response.data.message))
    }, [pollId, token])

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Result"/>
            {voted && <BarChart poll={poll}/>}
            {error && <Error>{error}</Error>}
            <Navbar/>
        </Page>
    )
}