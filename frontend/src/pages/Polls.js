import Page from "../components/Page";
import Header from "../components/Header";
import {useAuth} from "../auth/AuthProvider";
import {Redirect} from "react-router-dom";
import Navbar from "../components/Navbar";
import {useEffect, useState} from "react";
import {findOpenPolls} from "../service/api-service";
import Loading from "../components/Loading";
import Error from "../components/Error";
import PollsList from "../components/PollsList";
import StyledLink from "../components/StyledLink";


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
            <StyledLink to="/create">Create new poll</StyledLink>
            <Navbar/>
        </Page>
    )
}