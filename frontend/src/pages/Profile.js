import {Redirect} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Page from "../components/Page";
import Header from "../components/Header";

export default function Profile() {

    const {user} = useAuth()

    if (!user) {
        return <Redirect to="/login"/>
    }

    return (
        <Page>
            <Header title="Profile"/>
            <h1>This will once be the profile page</h1>
        </Page>
    )
}