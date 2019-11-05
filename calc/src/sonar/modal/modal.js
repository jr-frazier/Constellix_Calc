import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import ModalButton from "./modalbutton.js";
import SonarLocations from "./sonarlocations.js";
import Grid from "@material-ui/core/Grid";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    modal_id: 0
  };

  handleOpen = event => {
    console.log("check number", this.props.checkNumber);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClear = () => {
    this.props.clearCheck(this.props.checkNumber - 1);
  };

  changeListener(event, number) {
    this.props.changeEvent(event, number);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ModalButton
          buttonName="Monitoring Locations"
          onOpen={this.handleOpen}
        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Sonar Probe Locations
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Chose the locations you would like our monitors to run checks
              from.
            </Typography>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <SonarLocations
                  checkState={
                    this.props.theState.checks[this.props.checkNumber - 1]
                  }
                  check={this.props.theState.checks[this.props.checkNumber - 1]}
                  changeListener={event =>
                    this.changeListener(event, this.props.checkNumber)
                  }
                />
              </Grid>
              <Grid item>
                <Grid container justify="space-between">
                  <Grid item onClick={this.handleClose}>
                    <ModalButton buttonName="Close" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
