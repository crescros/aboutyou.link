import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./SignUpForm";
import Profile from "./Profile";
import { useUser } from "../hooks";
import OtherUser from "./OtherUser";

export default function Routes() {
  const { setToken } = useUser();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <Switch>
      <Route path="/app/login">
        <LoginForm />
      </Route>
      <Route path="/app/sign-up">
        <SignUp />
      </Route>
      <Route path="/app" exact>
        {localStorage.getItem("token") ? <Profile /> : <LoginForm />}
      </Route>
      <Route path="/:username/">
        <OtherUser />
      </Route>
      <Route path="/" exact>
        <Redirect to="/app"></Redirect>
      </Route>
    </Switch>
  );
}
