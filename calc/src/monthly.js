import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    minHeight: 623,
    maxHeight: 623,
    overflow: "auto"
  },
  dns: {
    margin: "10px 5px 10px 5px"
  },
  dns_totals_header: {
    border: "1px solid black"
  },
  dns_totals: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    padding: 2
  },
  sonar_totals: {
    margin: "0 5px 1px 5px",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    padding: 2
  },
  text_color: {
    color: "#ffffff",
    fontSize: theme.typography.pxToRem(20)
  },
  totals: {
    background: "#ffffff",
    padding: 0,
    minHeight: 441
  },
  checkHeading: {
    fontSize: theme.typography.pxToRem(20)
  },
  expansionIcon: {
    color: "#ffffff"
  },
  table: {
    minWidth: "100%"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  head: {
    backgroundColor: "#b5c0d1"
  }
});

class Monthly extends React.Component {
  // Renders Breakdown of Sonar Check
  renderSonar() {
    const sonar = this.props.sonarTotal;
    const sonarCheck = this.props.sonarCheck;
    const { classes } = this.props;
    let i = 0;
    return sonarCheck.map(x => {
      const checkType = x.check.checkType;
      const checkPolicy = x.check.checkPolicy;
      const checkLocations = x.check.checkLocations;
      const checkInterval = x.check.checkInterval;
      const checkAmount = x.check.checkAmount;
      let checkInt = null;
      let northAmerica = 0;
      let europe = 0;
      let asiaPacivic = 0;
      let oceania = 0;
      i += 1;
      console.log("SOOOONAAARRR", x);
      for (const key in checkLocations) {
        if (key === "North_America") {
          for (const naKey in checkLocations[key]) {
            if (checkLocations[key][naKey] === true) {
              northAmerica += 1;
            }
          }
        } else if (key === "Europe") {
          for (const euKey in checkLocations[key]) {
            if (checkLocations[key][euKey] === true) {
              europe += 1;
            }
          }
        } else if (key === "Asia_Pacific") {
          for (const apKey in checkLocations[key]) {
            if (checkLocations[key][apKey] === true) {
              asiaPacivic += 1;
            }
          }
        } else if (key === "Oceania") {
          for (const ocKey in checkLocations[key]) {
            if (checkLocations[key][ocKey] === true) {
              oceania += 1;
            }
          }
        }
      }

      // Converts seconds per month into a string displaying the time in seconds, minutes, and hours per check interval
      if (checkInterval === 86400) {
        checkInt = "30 seconds";
      } else if (checkInterval === 43200) {
        checkInt = "60 seconds";
      } else if (checkInterval === 8640) {
        checkInt = "5 minutes";
      } else if (checkInterval === 4320) {
        checkInt = "10 minutes";
      } else if (checkInterval === 1400) {
        checkInt = "30 minutes";
      } else if (checkInterval === 60) {
        checkInt = "12 hours";
      } else if (checkInterval === 30) {
        checkInt = "24 hours";
      }

      return (
        <ExpansionPanel key={x.check.checkKey}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.checkHeading}>
              {x.check.checkAmount} {checkType} Sonar Check/s ..............{" "}
              {parseFloat(sonar[i - 1]).toFixed(2)}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div id={x.check.checkKey + 1}>
              <p>Number of Checks: {checkAmount}</p>
              <p>Check Type: {checkType}</p>
              <p>Check Policy: {checkPolicy}</p>
              <p>Check Interval: {checkInt}</p>
              <h4>Monitoring Locations:</h4>
              <p>North America: {northAmerica}</p>
              <p>Europe: {europe}</p>
              <p>Asia Pacific: {asiaPacivic}</p>
              <p>Oceania: {oceania}</p>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  }

  //Sonar's Monthly Breakdown Button
  renderBreakdown(i) {
    const x = parseInt(i.target.id) + 1;
    const elementId = document.getElementById(x);
    console.log(x);
    if (elementId.className === "inactive-content") {
      return (elementId.className = "active-content");
    } else if (elementId.className === "active-content") {
      return (elementId.className = "inactive-content");
    }
  }

  //Renders Page
  render() {
    const { classes } = this.props;
    const records = this.props.obj.records ? this.props.obj.records : 0;

    //DNS Total
    const values = Object.values(this.props.obj);
    const dnsTotal = values.reduce((a, b) => {
      if (isNaN(a)) {
        a = 0;
      } else if (isNaN(b)) {
        b = 0;
      }
      return a + b;
    });

    //Sonar Total
    const sonarArr = this.props.sonarTotal;
    let sonarTotal = 0;

    if (sonarArr[0] >= 0) {
      sonarTotal = sonarArr.reduce((a, b) => {
        return a + b;
      });
    }

    // Table Cell
    const CustomTableCell = withStyles(theme => ({
      head: {
        backgroundColor: "#b7b7b7",
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    // Table Rows
    let id = 0;
    function createData(name, calories, fat) {
      id += 1;
      return { id, name, calories, fat };
    }

    const domainCost = !this.props.obj.domainPrice
      ? 0
      : parseFloat(this.props.obj.domainPrice).toFixed(2);
    const domainCount = ((domainCost - 5) / 0.095).toFixed(2);
    const domainNumber = !this.props.domainNumber ? 0 : this.props.domainNumber;
    const recordCount = !this.props.counts.recordCount
      ? 0
      : this.props.counts.recordCount;
    const recordCost = this.props.obj.records;
    const queryCost = !this.props.obj.queries
      ? 0
      : parseFloat(this.props.obj.queries).toFixed(2);
    const queryCount = !this.props.counts.queryCount
      ? 0
      : this.props.counts.queryCount;
    //GTD Counts
    const gtdCost = !this.props.obj.gtd
      ? 0
      : parseFloat(this.props.obj.gtd).toFixed(2);
    const gtdCount = !this.props.counts.gtdCount
      ? 0
      : this.props.counts.gtdCount;
    //Geo Proximity Counts
    const geoproxCost = !this.props.obj.geoprox
      ? 0
      : parseFloat(this.props.obj.geoprox).toFixed(2);
    const geoproxCount = !this.props.counts.geoProxCount
      ? 0
      : this.props.counts.geoProxCount;
    //IP Filter Counts
    const ipfilterCost = !this.props.obj.ipfilter
      ? 0
      : parseFloat(this.props.obj.ipfilter).toFixed(2);
    const ipfilterCount = !this.props.counts.ipFilterCount
      ? 0
      : this.props.counts.ipFilterCount;
    //ANAME
    const anameCost = !this.props.obj.aname
      ? 0
      : parseFloat(this.props.obj.aname).toFixed(2);
    const anameCount = !this.props.counts.anameCount
      ? 0
      : this.props.counts.anameCount;
    //Additional Users
    const adduserCost = !this.props.obj.addusers
      ? 0
      : parseFloat(this.props.obj.addusers).toFixed(2);
    const adduserCount = !this.props.counts.addUserCount
      ? 0
      : this.props.counts.addUserCount;
    const rows = [
      createData("Domains", domainNumber, `$${domainCost}`),
      createData("Records", recordCount, `$${recordCost}`),
      createData("Queries", queryCount, `$${queryCost}`),
      createData("GTD", gtdCount, `$${gtdCost}`),
      createData("Geo Proximity", geoproxCount, `$${geoproxCost}`),
      createData("IP Filters", ipfilterCount, `$${ipfilterCost}`),
      createData("ANAME", anameCount, `$${anameCost}`),
      createData("Additional Users", adduserCount, `$${adduserCost}`)
    ];

    const expand = "defauldExpaded";
    console.log(this.props.obj);
    return (
      <Paper elevation={1} className={classes.root}>
        <Grid container direction="column">
          <Grid item className={classes.dns}>
            <ExpansionPanel className={classes.dns_totals}>
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionIcon} />
                }
              >
                <Typography className={classes.text_color}>
                  DNS Monthly Total: ${parseFloat(dnsTotal).toFixed(2)}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.totals}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>Item</CustomTableCell>
                      <CustomTableCell align="right">Quantity</CustomTableCell>
                      <CustomTableCell align="right">Subtotal</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => {
                      return (
                        <TableRow className={classes.row} key={row.id}>
                          <CustomTableCell component="th" scope="row">
                            {row.name}
                          </CustomTableCell>
                          <CustomTableCell align="right">
                            {row.calories}
                          </CustomTableCell>
                          <CustomTableCell align="right">
                            {row.fat}
                          </CustomTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.sonar_totals}>
              <ExpansionPanelSummary
                expandIcon={
                  <ExpandMoreIcon className={classes.expansionIcon} />
                }
              >
                <Typography className={classes.text_color}>
                  Sonar Monthly Total: ${parseFloat(sonarTotal).toFixed(2)}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.totals}>
                <Grid container direction="column">
                  <Grid item>{this.renderSonar()}</Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Monthly);
