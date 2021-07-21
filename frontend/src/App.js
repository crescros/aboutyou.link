import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import { CssBaseline } from "@material-ui/core";

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <SnackbarProvider>
        <Routes />
      </SnackbarProvider>
    </Router>
  );
}
