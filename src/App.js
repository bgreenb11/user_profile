import React, { Fragment } from "react";
import {
  AppBar,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  createMuiTheme,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import { About, Articles, Projects } from "./components";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.action.disabledBackground,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  footer: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
  },
  header: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  media: {
    height: 140,
  },
  profileHeader: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

let profileTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        BGDev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App(props) {
  const classes = useStyles(profileTheme);

  return (
    <Fragment>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="relative" className={classes.header}>
        <Toolbar>
          <AppsIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Ben Greenberg Portfolio
          </Typography>
        </Toolbar>
      </AppBar>
      {/* End Navbar */}
      {/* Main Body */}
      <main>
        {/* Body Header */}
        <div className={classes.profileHeader}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card className={classes.media}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/static/user_profile/assets/research_bg.jpg"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.media}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/static/user_profile/assets/research_bg.jpg"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.media}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/static/user_profile/assets/research_bg.jpg"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.media}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/static/user_profile/assets/research_bg.jpg"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.media}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image="/static/user_profile/assets/research_bg.jpg"
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
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
  );
}

App.propTypes = {};

export default App;
