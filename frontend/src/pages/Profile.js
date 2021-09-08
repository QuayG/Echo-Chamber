import {Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Page from "../components/Page";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Avatar from "../components/Avatar";

export default function Profile() {

    const {user} = useAuth()

    if (!user) {
        return <Redirect to="/login"/>
    }

    return (
        <Page>
            <Header title={user.userName}/>
            <Main>
                <Avatar src={user.avatarUrl} alt=""/>
            </Main>
            <Navbar user={user}/>
        </Page>
    )
}