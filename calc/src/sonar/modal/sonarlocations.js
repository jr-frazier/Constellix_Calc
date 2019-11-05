import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  sonarExpand: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    padding: 2
  },
  sonarRegion: {
    color: "#ffffff"
  },
  sonarCheckLocations: {
    background: "#ffffff"
  }
});
class SonarLocations extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChange(event) {
    this.props.changeListener(event);
  }

  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };
  Locations() {
    const obj = this.props.check["check"]["checkLocations"];
    const usLocations = [];
    const euLocations = [];
    const apLocations = [];
    const ocLocations = [];
    const { classes } = this.props;
    const { expanded } = this.state;

    for (const key in obj) {
      if (key === "North_America") {
        const newObj = obj[key];
        for (const x in newObj) {
          const y = x.split("_");
          if (y.length > 2) {
            y.splice(2, 0, ", ");
            y.splice(1, 0, " ");
            usLocations.push(y.join(""));
          } else {
            usLocations.push(y.join(", "));
          }
        }
      } else if (key === "Europe") {
        const newObj = obj[key];
        for (const x in newObj) {
          const y = x.split("_");
          if (y.length > 2) {
            y.splice(2, 0, `,`);
            euLocations.push(y.join(" "));
          } else {
            euLocations.push(y.join(", "));
          }
        }
      } else if (key === "Asia_Pacific") {
        const newObj = obj[key];
        for (const x in newObj) {
          const y = x.split("_");
          if (y.length > 2) {
            y.splice(2, 0, `,`);
            apLocations.push(y.join(" "));
          } else {
            apLocations.push(y.join(", "));
          }
        }
      } else {
        const newObj = obj[key];
        for (const x in newObj) {
          const y = x.split("_");
          if (y.length > 2) {
            y.splice(2, 0, `,`);
            ocLocations.push(y.join(" "));
          } else {
            ocLocations.push(y.join(", "));
          }
        }
      }
    }
    return (
      <div>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleExpand("panel1")}
          className={classes.sonarExpand}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.sonarRegion} />}
          >
            <Typography
              variant="h5"
              component="h3"
              className={classes.sonarRegion}
            >
              North America
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.sonarCheckLocations}>
            <Grid container direction="column" spacing={8}>
              {usLocations.map(x => {
                return (
                  <Grid item key={x}>
                    <label>{x}</label>
                    <input
                      className="North_America"
                      id={x.replace(/,/g, "").replace(/ /g, "_")}
                      type="checkbox"
                      defaultChecked={
                        this.props.checkState["check"]["checkLocations"][
                          "North_America"
                        ][
                          `${x
                            .split(",")
                            .join("")
                            .split(" ")
                            .join("_")}`
                        ]
                      }
                      onChange={event => this.handleChange(event)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleExpand("panel2")}
          className={classes.sonarExpand}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.sonarRegion} />}
          >
            <Typography
              variant="h5"
              component="h3"
              className={classes.sonarRegion}
            >
              Europe
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.sonarCheckLocations}>
            <Grid container direction="column" spacing={8}>
              {euLocations.map(x => {
                return (
                  <Grid item key={x}>
                    <label>{x}</label>
                    <input
                      className="Europe"
                      id={x.replace(/,/g, "").replace(/ /g, "_")}
                      type="checkbox"
                      defaultChecked={
                        this.props.checkState["check"]["checkLocations"][
                          "Europe"
                        ][
                          `${x
                            .split(",")
                            .join("")
                            .split(" ")
                            .join("_")}`
                        ]
                      }
                      onChange={event => this.handleChange(event)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={this.handleExpand("panel3")}
          className={classes.sonarExpand}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.sonarRegion} />}
          >
            <Typography
              variant="h5"
              component="h3"
              className={classes.sonarRegion}
            >
              Asia Pacific
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.sonarCheckLocations}>
            <Grid container direction="column" spacing={8}>
              {apLocations.map(x => {
                return (
                  <Grid item key={x}>
                    <label>{x}</label>
                    <input
                      className="Asia_Pacific"
                      id={x.replace(/,/g, "").replace(/ /g, "_")}
                      type="checkbox"
                      defaultChecked={
                        this.props.checkState["check"]["checkLocations"][
                          "Asia_Pacific"
                        ][
                          `${x
                            .split(",")
                            .join("")
                            .split(" ")
                            .join("_")}`
                        ]
                      }
                      onChange={event => this.handleChange(event)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel4"}
          onChange={this.handleExpand("panel4")}
          className={classes.sonarExpand}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.sonarRegion} />}
          >
            <Typography
              variant="h5"
              component="h3"
              className={classes.sonarRegion}
            >
              Oceania
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.sonarCheckLocations}>
            <Grid container direction="column" spacing={8}>
              {ocLocations.map(x => {
                return (
                  <Grid item key={x}>
                    <label>{x}</label>
                    <input
                      className="Oceania"
                      id={x.replace(/,/g, "").replace(/ /g, "_")}
                      type="checkbox"
                      defaultChecked={
                        this.props.checkState["check"]["checkLocations"][
                          "Oceania"
                        ][
                          `${x
                            .split(",")
                            .join("")
                            .split(" ")
                            .join("_")}`
                        ]
                      }
                      onChange={event => this.handleChange(event)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  render() {
    return this.Locations();
  }
}

SonarLocations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SonarLocations);
