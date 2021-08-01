import React, {lazy, useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/vendors/AccessibleNavigationAnnouncer";
import "./i18n/config";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {checkAuth} from "./store/auth/authAction";
import ThemedSuspense from "./components/vendors/ThemedSuspense";
import {useTranslation} from "react-i18next";
import axios from "./axios/vendors/auth.axios";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/vendors/Login"));
const CreateAccount = lazy(() => import("./pages/vendors/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/vendors/ForgotPassword"));

function App() {
    const {i18n} = useTranslation();

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
        axios.defaults.headers.common["accept-language"]=i18n.language;
    }, []);

    let routes;
    if (isAuth === 1) {
        routes = (
            <>
                <Route path="/app" component={Layout}/>
                <Redirect to="/app"/>
            </>
        )
    } else if (isAuth === 2) {
        routes = (
            <>
                <Route path="/login" component={Login}/>
                <Route path="/create-account" component={CreateAccount}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
                <Redirect exact from="/" to="/login"/>
            </>
        )
    } else {
        routes = (<ThemedSuspense/>)
    }
    console.log(routes, isAuth);
    return (
        <>
            <Router>
                <AccessibleNavigationAnnouncer/>
                <Switch>
                    {routes}
                </Switch>
            </Router>
        </>
    );
}

export default App;
