import AuthProvider from "./auth/AuthProvider";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Polls from "./pages/Polls";
import CreatePoll from "./pages/CreatePoll";
import Result from "./pages/Result";
import Vote from "./pages/Vote";


export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/main_menu" component={Menu} />
                    <Route exact path="/polls" component={Polls} />
                    <Route path="/create" component={CreatePoll} />
                    <Route path="/result/:pollId" component={Result} />
                    <Route path="/vote/:pollId" component={Vote} />
                </Switch>
            </Router>
        </AuthProvider>
    )
}