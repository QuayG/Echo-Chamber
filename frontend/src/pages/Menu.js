import {Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Page from "../components/Page";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Main from "../components/Main";

export default function Menu() {

    const {user} = useAuth()

    if (!user) {
        return <Redirect to="/"/>
    }

    return (
        <Page>
            <Header title="Menu"/>
            <Main>
                <h1>Hier könnte mal was stehen.</h1>
            </Main>
            <Navbar user={user}/>
        </Page>
    )
}