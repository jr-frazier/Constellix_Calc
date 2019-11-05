import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import CheckType from "./selects/checkType.js";
import CheckInt from "./selects/checkInterval.js";
import CheckPolicy from "./selects/checkPolicy.js";
import CheckAmount from "./checkAmount.js";
import CloseButton from "./close-button.js";
import Modal from "./modal/modal.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  sonar: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 2
  }
});
//Model Element
ReactModal.setAppElement("#root");

// Beginning of Sonar Check
class SonarCheck extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      na_eu: 0,
      check_int: 0,
      modal_id: 0
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpenModal(event) {
    const modalId = event.target.id;
    //this.setState({ showModal: true });
    //splitting up the state to grab the check locations state
    this.setState({ modal_id: modalId });
  }

  handleCloseModal(event) {
    this.setState({ showModal: false });
  }

  //Check Location Handler
  handleChange(event) {
    const checkId = `defaultChecked_${event.target.id}`;
    const checkClass = event.target.className;
    const newState = {};
    if (event.target.checked === true) {
      const num = this.state[checkClass] + 1;
      const checkState = {};
      checkState[checkClass] = num;
      this.setState(checkState);
      newState[checkId] = true;
      this.setState(newState);
    } else {
      const num = this.state[checkClass] - 1;
      const checkState = {};
      checkState[checkClass] = num;
      this.setState(checkState);
      newState[checkId] = false;
      this.setState(newState);
    }
    console.log(checkId);
  }

  //Check Location handeler
  changeListener(event, number) {
    console.log(event.target, number, "<---------------");
    this.props.changeListener(event, number);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} direction="column">
        {this.props.value.map(x => {
          return (
            <Grid item key={this.props.theState.checks[x - 1].check.checkKey}>
              <Paper
                className={classes.sonar}
                key={this.props.theState.checks[x - 1].check.checkKey}
                onSubmit={event => event.preventDefault()}
              >
                <Grid container spacing={24} direction="column">
                  <Grid item>
                    <Grid container justify="space-between">
                      <Grid item>
                        <CheckAmount
                          changeListener={event =>
                            this.changeListener(event, x)
                          }
                        />
                      </Grid>
                      <Grid item onClick={() => this.props.delete(x)}>
                        <CloseButton />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justify="row" spacing={40}>
                      <Grid item>
                        <CheckType
                          changeEvent={event => this.changeListener(event, x)}
                        />
                      </Grid>
                      <Grid item>
                        <CheckInt
                          changeEvent={event => this.changeListener(event, x)}
                        />
                      </Grid>
                      <Grid item>
                        <CheckPolicy
                          changeEvent={event => this.changeListener(event, x)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className="modal-button">
                    <Modal
                      checkNumber={x}
                      theState={this.props.theState}
                      changeEvent={event => this.changeListener(event, x)}
                      clearCheck={this.props.clearCheck}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

SonarCheck.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SonarCheck);
