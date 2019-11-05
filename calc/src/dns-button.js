import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  dns1: {
    position: "absolute",
    zIndex: 1,
    opacity: 1,
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    transition: "0.2s",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    }
  },
  dns2: {
    position: "absolute",
    opacity: 0.4,
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    transition: "0.2s"
  }
});

function DnsButton(props) {
  const { classes } = props;
  const dns = !props.dnsButton ? classes.dns2 : classes.dns1;
  return (
    <Grid item key="dns">
      <Fab color="primary" aria-label="DNS" className={dns}>
        DNS
      </Fab>
    </Grid>
  );
}

DnsButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DnsButton);
