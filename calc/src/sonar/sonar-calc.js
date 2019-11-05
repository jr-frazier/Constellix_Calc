import React from "react";
import SonarChecks from "./sonar-checks.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Banner from "../dns/ds-banner.js";

const styles = theme => ({
  sonar1: {
    display: "block"
  },
  sonar2: {
    display: "none"
  },
  page: {
    ...theme.mixins.gutters(),
    minHeight: 608,
    maxHeight: 608,
    overflow: "auto",
    paddingTop: theme.spacing.unit * 2
  }
});
class SonarCalc extends React.Component {
  render() {
    const { classes } = this.props;
    const formDisplay = !this.props.theTabState
      ? classes.sonar1
      : classes.sonar2;
    return (
      <Grid container direction="column" spacing={40} className={formDisplay}>
        <Grid item>
          <Banner bannerName="Sonar Calculator" />
        </Grid>
        <Grid item>
          <Paper elevation={1} className={classes.page}>
            <SonarChecks
              allLocations={i => this.saveLocation(i)}
              getTotal={total => this.props.getTotal(total)}
              deleteSonar={x => this.props.deleteSonar(x)}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SonarCalc);
