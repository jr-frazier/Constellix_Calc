import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class ControlledOpenSelect extends React.Component {
  state = {
    check_int: "",
    open: false
  };

  handleChange = event => {
    this.props.changeEvent(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">
            Check Interval
          </InputLabel>
          <Select
            id="check_int"
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.check_int}
            onChange={this.handleChange}
            inputProps={{
              name: "check_int",
              id: "check_int"
            }}
          >
            <MenuItem value="86400">30 Seconds</MenuItem>
            <MenuItem value="43200">1 Minute</MenuItem>
            <MenuItem value="21600">2 Minutes</MenuItem>
            <MenuItem value="14400">3 Minutes</MenuItem>
            <MenuItem value="10800">4 Minutes</MenuItem>
            <MenuItem value="8640">5 Minutes</MenuItem>
            <MenuItem value="4320">10 Minutes</MenuItem>
            <MenuItem value="1400">30 Minutes</MenuItem>
            <MenuItem value="60">12 Hours</MenuItem>
            <MenuItem value="30">24 Hours</MenuItem>
          </Select>
        </FormControl>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledOpenSelect);
