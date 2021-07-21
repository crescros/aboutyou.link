import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";

export default function App() {
  return (
    <Router>
      <SnackbarProvider>
        <div>Mesidor</div>
        <Routes />
      </SnackbarProvider>
    </Router>
  );
}
