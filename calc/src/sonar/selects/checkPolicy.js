import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class ControlledOpenSelect extends React.Component {
  state = {
    check_policy: "",
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
            Check Policy
          </InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.check_policy}
            onChange={this.handleChange}
            inputProps={{
              name: "check_policy",
              id: "check_type"
            }}
          >
            <MenuItem value="Simultaneous">Simultaneous</MenuItem>
            <MenuItem value="OncePerSite">Once Per Site</MenuItem>
          </Select>
        </FormControl>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledOpenSelect);
