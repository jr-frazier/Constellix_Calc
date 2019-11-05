import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  sonar1: {
    marginLeft: 45,
    zIndex: 1,
    transition: "3",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    opacity: 1,
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    }
  },
  sonar2: {
    marginLeft: 45,
    opacity: 0.4,
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    transition: "0.2s"
  }
});

function SonarButton(props) {
  const { classes } = props;
  const sonar = !props.sonarButton ? classes.sonar1 : classes.sonar2;
  return (
    <div key="sonar">
      <Fab color="primary" aria-label="DNS" className={sonar}>
        Sonar
      </Fab>
    </div>
  );
}

SonarButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SonarButton);
