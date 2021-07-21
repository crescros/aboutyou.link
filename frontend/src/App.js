import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import { CssBaseline, Button, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

export const lightTheme = createTheme({
  palette: {
    // background: {
    //   default: "#ebebeb",
    // },
    // primary: {
    //   main: "#fff",
    // },
    // secondary: {
    //   main: #ff0000,
    //   dark: "#fff",
    //   contrastText: "#fff",
    // },
    type: "light",
  },
  shadows: ["none"],
});

export default function App() {
  // add action to all snackbars
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    console.log("hello");
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <SnackbarProvider
        ref={notistackRef}
        action={(key) => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}
      >
        <Router>
          <Routes />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
