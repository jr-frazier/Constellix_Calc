import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#007bff",
    borderColor: "#007bff"
  }
});

function DsBanner(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography component="h2" variant="Title">
          {props.bannerName}
        </Typography>
      </Paper>
    </div>
  );
}

DsBanner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DsBanner);
