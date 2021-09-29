import AuthProvider from "./auth/AuthProvider";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Polls from "./pages/Polls";
import CreatePoll from "./pages/CreatePoll";
import Result from "./pages/Result";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import DeletePolls from "./pages/DeletePolls";

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
                    <Route exact path="/results" component={Results} />
                    <Route path="/results/:pollId" component={Result} />
                    <Route path="/vote/:pollId" component={Vote} />
                    <Route path="/delete" component={DeletePolls}/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}