import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, TextField, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { login } from "../store/user";

function Login(props) {
  const profileTheme = useTheme();
  const useStyles = makeStyles((theme) => ({
    form: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "40ch",
      },
      "& .MuiButton-root": {
        margin: theme.spacing(1),
        width: "40ch",
      },
      "& .MuiTypography-root": {
        margin: theme.spacing(1),
      },
      border: `2px solid ${theme.palette.text.secondary}`,
      borderRadius: 16,
      padding: theme.spacing(2),
      width: "30em",
      textAlign: "center",
      alignItems: "center",
    },
    image_input: { display: "none" },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      background: profileTheme.palette.background.default,
      borderRadius: 16,
      margin: "auto",
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    username: "",
    password: "",
  });

  const handleClose = () => {
    setData({
      username: "",
      password: "",
    });
    props.handleClose();
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(login(data));
    handleClose();
  };

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="Login Form"
    >
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography
            id="header"
            variant="h5"
            component="h2"
            color="textSecondary"
          >
            Login
          </Typography>
          <TextField
            variant="filled"
            id="username"
            name="username"
            value={data.username}
            label="Username"
            onChange={handleChange}
            required
          />
          <br />
          <TextField
            variant="filled"
            id="password"
            name="password"
            type="password"
            value={data.password}
            label="Password"
            onChange={handleChange}
            required
          />
          <br />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </form>
      </div>
    </Modal>
  );
}

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Login;
