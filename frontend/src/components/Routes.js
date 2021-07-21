import React from "react";
import LoginForm from "./LoginForm";
import { Switch, Route } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route path="/">
        <LoginForm />
      </Route>
    </Switch>
  );
}
