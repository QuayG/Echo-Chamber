import AuthProvider from "./auth/AuthProvider";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Polls from "./pages/Polls";
import CreatePoll from "./pages/CreatePoll";
import Result from "./pages/Result";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import DeletePolls from "./pages/DeletePolls";
import ProtectedRoute from "./auth/ProtectedRoutes";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRoute path="/home" component={Home} />
                    <ProtectedRoute exact path="/polls" component={Polls} />
                    <ProtectedRoute path="/create" component={CreatePoll} />
                    <ProtectedRoute exact path="/results" component={Results} />
                    <ProtectedRoute path="/results/:pollId" component={Result} />
                    <ProtectedRoute path="/vote/:pollId" component={Vote} />
                    <ProtectedRoute adminOnly path="/delete" component={DeletePolls}/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}