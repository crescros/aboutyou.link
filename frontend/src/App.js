import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import { CssBaseline, Button, ThemeProvider } from "@material-ui/core";

export default function App() {
  // add action to all snackbars
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    console.log("hello")
    notistackRef.current.closeSnackbar(key);
  }

  return (
    <ThemeProvider>
      <CssBaseline />
      <SnackbarProvider
        ref={notistackRef}
        action={(key) => (
          <Button onClick={onClickDismiss(key)}>
            Dismiss
          </Button>
        )}
      >
        <Router>
          <Routes />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
