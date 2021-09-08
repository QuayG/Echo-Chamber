import AuthProvider from "./auth/AuthProvider";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/">
                        <Profile/>
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    )
}