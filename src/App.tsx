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
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/vendors/Login"));
const CreateAccount = lazy(() => import("./pages/vendors/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/vendors/ForgotPassword"));
function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  let routes;
  if(isAuth===1){
    routes=(
        <>
            <Route path="/app" component={Layout} />
            <Redirect to="/app" />
        </>
    )
  }else if(isAuth===2){
    routes=(
        <>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Redirect exact from="/" to="/login" />
        </>
    )
  }else{
    routes=(<ThemedSuspense />)
  }
console.log(routes,isAuth);
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          {routes}
        </Switch>
      </Router>
    </>
  );
}
export default App;
