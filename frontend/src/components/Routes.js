import React from "react";
import LoginForm from "./LoginForm";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUpForm";
import Profile from "./Profile";

export default function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/me">
        <Profile />
      </Route>
      <Route path="/" exact>
        {localStorage.getItem("token") ? <Profile /> : <LoginForm />}
      </Route>
    </Switch>
  );
}
