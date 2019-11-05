import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import deepPurple from "@material-ui/core/colors/deepPurple";

const styles = theme => ({
  button: {
    "&:hover": {
      color: deepPurple[800]
    }
  }
});

function ContainedButtons(props) {
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={props.button}
        onClick={props.onOpen}
      >
      {props.buttonName}
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButtons);
