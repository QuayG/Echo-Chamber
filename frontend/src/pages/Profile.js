import {Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Page from "../components/Page";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Profile() {

    const {user} = useAuth()

    if (!user) {
        return <Redirect to="/login"/>
    }

    return (
        <Page>
            <Header title={user.username}/>
            <h1>This will once be the profile page</h1>
            <Navbar user={user}/>
        </Page>
    )
}