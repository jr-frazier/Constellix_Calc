import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  textField: {
    width: 50
  }
});

class TextFields extends React.Component {
  handleChange = name => event => {
    this.props.changeListener(event);
  };

  render() {
    const { classes } = this.props;

    return (
      <form noValidate autoComplete="off">
        <TextField
          id="check_amount"
          className={classes.textField}
          label="Quantity"
          onChange={this.handleChange()}
          type="number"
          defaultValue="1"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
