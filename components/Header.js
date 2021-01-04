import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Button,
  Divider,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import { useSelector } from "react-redux";
import Login from "./Login";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
  },
  auth: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    "& .MuiTypography-root": {
      textTransform: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

function Header(props) {
  const classes = useStyles();
  const navbar_title = "Ben Greenberg Portfolio";
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Fragment>
      <AppBar position="relative" className={classes.header}>
        <Toolbar>
          <AppsIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            {navbar_title}
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link href="#" color="inherit">
            <Typography variant="h6" color="inherit" noWrap>
              Projects
            </Typography>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link href="#" color="inherit">
            <Typography variant="h6" color="inherit" noWrap>
              Education
            </Typography>
          </Link>
          {user && isAuthenticated ? (
            <Link
              href="/accounts/logout"
              color="inherit"
              className={classes.auth}
            >
              <Typography variant="h6" color="inherit" noWrap>
                Logout
              </Typography>
            </Link>
          ) : (
            <Button
              color="inherit"
              onClick={() => setOpen(true)}
              className={classes.auth}
            >
              <Typography variant="h6" color="inherit" noWrap>
                Login
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Login open={open} handleClose={() => setOpen(false)} />
    </Fragment>
  );
}

Header.propTypes = {};

export default Header;
