import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import PageviewIcon from "@material-ui/icons/Pageview";
import GitHubIcon from "@material-ui/icons/GitHub";
import ProjectForm from "./ProjectForm";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(1),
  },
  add_icon: {
    marginLeft: theme.spacing(2),
  },
  card: {
    borderRadius: 16,
    padding: theme.spacing(1),
    position: "relative",
    textAlign: "center",
    margin: theme.spacing(1),
  },
  card_link: {
    "&:hover": {
      color: "white",
    },
    marginLeft: "auto",
  },
  chip: {
    margin: theme.spacing(1),
    borderColor: "white",
  },
  edit_icon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  grid: {
    justify: "center",
    alignItems: "center",
    margin: theme.spacing(1),
    alignItems: "stretch",
  },
  header: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
  },
  media: {
    borderRadius: 16,
    margin: "auto",
    height: "25em",
  },
}));

function Projects(props) {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const projects = useSelector((state) => state.projects.projects);

  return (
    <Fragment>
      <Typography variant="h1" component="h2" className={classes.title}>
        Projects
      </Typography>
      <Divider variant="middle" />
      {user && isAuthenticated && (
        <IconButton className={classes.add_icon} onClick={() => setEdit(true)}>
          <EditIcon />
        </IconButton>
      )}
      <Grid container spacing={2} className={classes.grid}>
        {projects.map((p, i) => (
          <Grid
            item
            className={classes.card}
            component={Card}
            xs={3}
            key={`grid_${i}`}
          >
            <CardHeader title={p.title} />
            <CardMedia
              className={classes.media}
              component="img"
              image={p.image}
            />
            <CardContent>
              {p.attributes &&
                p.attributes
                  .split(",")
                  .map((attr) => (
                    <Chip
                      label={attr}
                      key={`${attr.toLowerCase()}_chip`}
                      className={classes.chip}
                      variant="outlined"
                    />
                  ))}
              <Typography variant="body2" color="textSecondary" component="p">
                {p.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {p.url !== "" && (
                <IconButton
                  className={classes.card_link}
                  component="a"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  color="default"
                >
                  <GitHubIcon />
                </IconButton>
              )}
              {p.example !== "" && (
                <IconButton
                  className={classes.card_link}
                  component="a"
                  href={p.example}
                  target="_blank"
                  rel="noreferrer"
                  color="default"
                >
                  <PageviewIcon />
                </IconButton>
              )}
            </CardActions>
          </Grid>
        ))}
      </Grid>
      <ProjectForm open={edit} handleClose={() => setEdit(false)} />
    </Fragment>
  );
}

Projects.propTypes = {};

export default Projects;
