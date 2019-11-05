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
    check_type: "",
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
            Check Type
          </InputLabel>
          <Select
            id="check_type"
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.check_type}
            onChange={this.handleChange}
            inputProps={{
              name: "check_type",
              id: "check_type"
            }}
          >
            <MenuItem value="HTTP">HTTP</MenuItem>
            <MenuItem value="HTTPS">HTTPS</MenuItem>
            <MenuItem value="TCP">TCP</MenuItem>
            <MenuItem value="DNS">DNS</MenuItem>
            <MenuItem value="Waterfall">Waterfall</MenuItem>
          </Select>
        </FormControl>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledOpenSelect);
