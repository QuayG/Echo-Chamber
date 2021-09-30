import Page from "../components/Page";
import Header from "../components/Header";
import {useAuth} from "../auth/AuthProvider";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Navbar from "../components/Navbar";
import {findDonePolls} from "../service/api-service";
import ResultsList from "../components/ResultsList";
import {InitialPollState} from "../components/InitialPollState";

export default function Results() {

    const {user, token} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [polls, setPolls] = useState([InitialPollState])

    useEffect(() => {
        setLoading(true)
        setError()
        findDonePolls(token)
            .then(polls => setPolls(polls))
            .catch(error => setError(error.response.data.error))
            .finally(() => setLoading(false))
    }, [token])

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Results"/>
            {loading && <Loading/>}
            {!loading && <ResultsList polls={polls}/>}
            {error && <Error>{error}</Error>}
            <Navbar/>
        </Page>
    )
}