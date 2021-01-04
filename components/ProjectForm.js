import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { addProjectTemp, editProject } from "../store/projects";

function AddProjectForm(props) {
  const profileTheme = useTheme();
  const useStyles = makeStyles((theme) => ({
    card: {
      width: "15em",
      justifyContent: "center",
    },
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

  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const projects = useSelector((state) => state.projects.projects);

  const [index, setIndex] = useState(-1);

  const baseProject = {
    title: "",
    url: "",
    example: "",
    image: "",
    user: isAuthenticated ? user.username : "",
    components: [],
    description: ``,
  };

  const [project, setProject] = useState(baseProject);

  const projectSelect = (e) => {
    setIndex(e.target.value);
    console.log(index);
    if (e.target.value > -1) {
      setProject(projects[e.target.value]);
    } else {
      setProject(baseProject);
    }
  };

  const handleClose = () => {
    setProject(baseProject);
    setIndex(-1);
    props.handleClose();
  };

  const handleSubmit = () => {
    console.log(project, index);
    dispatch(
      index > -1 ? editProject({ project, index }) : addProjectTemp(project)
    );
    handleClose();
  };

  const handleChange = (e) => {
    const target = e.target;
    const val = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;

    // TODO Support image deletion
    setProject({
      ...project,
      [name]: target.type !== "file" ? val : URL.createObjectURL(val),
    });
  };

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="Add Project Form"
      aria-describedby="This modal will let you add a project to your projects page."
    >
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography
            id="header"
            variant="h5"
            component="h2"
            color="textSecondary"
          >
            Add Project Form
          </Typography>
          <Select
            labelId="projectSelector"
            variant="outlined"
            value={index}
            onChange={projectSelect}
          >
            <MenuItem key="new_project" value={-1}>
              New Project
            </MenuItem>
            {projects.map((p, i) => (
              <MenuItem key={p.title} value={i}>
                {p.title}
              </MenuItem>
            ))}
          </Select>
          <TextField
            variant="filled"
            id="title"
            name="title"
            value={project.title}
            label="Project Title"
            onChange={handleChange}
            required
          />
          <br />
          <TextField
            variant="filled"
            id="url"
            name="url"
            value={project.url}
            label="Git Repo?"
            onChange={handleChange}
          />
          <br />
          <TextField
            variant="filled"
            id="example"
            name="example"
            value={project.example}
            label="Alt/Example Page"
            onChange={handleChange}
          />
          <br />
          <input
            accept="image/*"
            name="image"
            className={classes.image_input}
            id="image_file"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="image_file">
            <Button variant="outlined" component="span">
              {index != -1 ? "Change Image?" : "Add Image?"}
            </Button>
          </label>
          {project.image !== "" && (
            <Grid
              container
              spacing={0}
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Grid item xs>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    alt={`${project.title} Image`}
                    image={project.image}
                    title={`${project.title} Image`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {project.title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Image Preview
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
}

AddProjectForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddProjectForm;
