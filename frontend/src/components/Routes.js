import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUpForm";
import Profile from "./Profile";
import { useUser } from "../hooks";

export default function Routes() {
  const { setToken } = useUser();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/" exact>
        {localStorage.getItem("token") ? <Profile /> : <LoginForm />}
      </Route>
    </Switch>
  );
}
