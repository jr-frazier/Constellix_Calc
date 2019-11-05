import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Banner from "./ds-banner.js";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DnsCalculation from "./dns-calculations";

const styles = theme => ({
  dns1: {
    display: "block"
  },
  dns2: {
    display: "none"
  },
  formContent: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 5,
    paddingLeft: theme.spacing.unit * 1
  },
  textField: {
    [theme.breakpoints.down("xl")]: { width: 500 },
    [theme.breakpoints.down(1658)]: { width: 400 },
    [theme.breakpoints.down(1418)]: { width: 300 }
  },
  icon: {
    marginTop: 10,
    padding: 3
  }
});

class DnsCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      domains: {
        label: ["active-label"],
        input: "inactive"
      },
      records: {
        label: ["active-label"],
        input: "inactive"
      },
      queries: {
        label: ["active-label"],
        input: "inactive"
      },
      gtd: {
        label: ["active-label"],
        input: "inactive"
      },
      geoprox: {
        label: ["active-label"],
        input: "inactive"
      },
      ipfilter: {
        label: ["active-label"],
        input: "inactive"
      },
      aname: {
        label: ["active-label"],
        input: "inactive"
      },
      addusers: {
        label: ["active-label"],
        input: "inactive"
      }
    };
  }

  getValue() {
    return this.props.value;
  }

  //Passes Form Values to App.js to be calculated
  handleValue(event) {
    const x = event.target.id;
    const y = event.target.value;
    const obj = [x, parseInt(y, 10)];
    this.props.getTotal(obj);
    DnsCalculation(obj);
  }

  // Handles the onFocus and onBlur events for each DNS field
  handleLabel(event) {
    const target = event.target.id;
    const targetClass = event.target.className;
    const targetVal = event.target.value;
    if (targetClass === "inactive") {
      const theState = this.state;
      const objTarget = theState[target];
      objTarget["label"][1] = "show";
      objTarget["input"] = "active";
      this.setState({ objTarget });
    } else if (targetClass === "active" && targetVal.length === 0) {
      const theState = this.state;
      const objTarget = theState[target];
      objTarget["label"][1] = "";
      objTarget["input"] = "inactive";
      this.setState({ objTarget });
    }
  }

  render() {
    const { classes } = this.props;
    const formDisplay = !this.props.theTabState ? classes.dns2 : classes.dns1;
    return (
      <Grid container direction="column" spacing={40} className={formDisplay}>
        <Grid item>
          <Banner bannerName="DNS Calculator" />
        </Grid>
        <Grid item>
          <Paper elevation={1} className={classes.formContent}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              spacing={24}
            >
              <Grid item>
                <TextField
                  type="number"
                  id="domains"
                  label="Number Of Domains"
                  onChange={event => this.handleValue(event)}
                  className={classes.textField}
                />
                <Tooltip
                  title="Number of domains you will be adding in Constellix DNS"
                  aria-lable="Add"
                >
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="records"
                  className={this.state.records.input}
                  label="Number of Records"
                  value={this.getValue()}
                  onChange={event => this.handleValue(event)}
                  className={classes.textField}
                />
                <Tooltip
                  title="Number of total records for all domains that will be using Constellix"
                  aria-lable="Add"
                >
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="queries"
                  label="Queries Per Month"
                  className={this.state.queries.input}
                  onChange={event => this.handleValue(event)}
                  className={classes.textField}
                />
                <Tooltip
                  title="Aproximate number (in millions) of quereies that your domains generate on a montlhy basis. Example: if your domains receive a total of 1 million queries per month you would enter the value of 1"
                  aria-lable="Add"
                >
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="gtd"
                  className={this.state.gtd.input}
                  label="GTD Enabled Domains"
                  onChange={event => this.handleValue(event)}
                  className={classes.textField}
                />
                <Tooltip
                  title="Number of domains that will be configured with GTD"
                  aria-lable="Add"
                >
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="geoprox"
                  className={this.state.geoprox.input}
                  label="Geo Proximity"
                  onChange={event => this.handleValue(event)}
                  className={classes.textField}
                />
                <Tooltip title="Number of domains " aria-lable="Add">
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="ipfilter"
                  className={this.state.ipfilter.input}
                  label="IP Filters"
                  onChange={event => this.handleValue(event)}
                  className={classes.textField}
                />
                <Tooltip
                  title="Number of IP Filters that will be configured in total."
                  aria-lable="Add"
                >
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="aname"
                  className={this.state.aname.input}
                  label="ANAME Records"
                  onChange={event => {
                    this.handleValue(event);
                  }}
                  className={classes.textField}
                />
                <Tooltip
                  title="Number of ANAME records that will be configured in total."
                  aria-lable="Add"
                >
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="addusers"
                  className={this.state.addusers.input}
                  label="User Accounts"
                  onChange={event => {
                    this.handleValue(event);
                  }}
                  className={classes.textField}
                />
                <Tooltip
                  title="Number of additional unique user accounts."
                  aria-lable="Add"
                >
                  <IconButton
                    arial-label="Add"
                    color="inherit"
                    className={classes.icon}
                  >
                    <HelpIcon fontSize="large" color="disabled" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

DnsCalc.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DnsCalc);
