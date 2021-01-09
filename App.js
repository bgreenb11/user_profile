import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  makeStyles,
  Typography,
  ThemeProvider,
  useMediaQuery,
  Link,
} from "@material-ui/core";
import { Header, Projects } from "./components";
import PropTypes from "prop-types";
import { getUser } from "./store/user";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Ben Greenberg
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App(props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const profileTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const useStyles = makeStyles((theme) => ({
    footer: {
      padding: theme.spacing(6),
    },
    profileHeader: {
      backgroundColor: profileTheme.palette.background.default,
      padding: theme.spacing(8, 0, 6),
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  React.useEffect(() => {
    console.log("Token", token);
    dispatch(getUser(token));
  }, []);

  return (
    <ThemeProvider theme={profileTheme}>
      <Fragment>
        <CssBaseline />

        {/* Navbar */}
        <Header />
        {/* End Navbar */}
        {/* Main Body */}
        <main>
          {/* Body Header */}
          <div className={classes.profileHeader}>
            <Container maxWidth="lg">
              <Projects />
            </Container>
          </div>
          {/* End Body Header */}
        </main>
        {/* End Main Body */}
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Filler for the footer cause why not!
          </Typography>
          <Copyright />
        </footer>
        {/* End Footer */}
      </Fragment>
    </ThemeProvider>
  );
}

App.propTypes = {};

export default App;
