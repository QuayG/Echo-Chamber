import AuthProvider from "./auth/AuthProvider";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Polls from "./pages/Polls";
import CreatePoll from "./pages/CreatePoll";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/main_menu">
                        <Menu/>
                    </Route>
                    <Route exact path="/polls">
                        <Polls/>
                    </Route>
                    <Route path="/create">
                        <CreatePoll/>
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    )
}