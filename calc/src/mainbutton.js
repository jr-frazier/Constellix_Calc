import React, { Component } from "react";
import "typeface-roboto";
import DnsButton from "./dns-button.js";
import SonarButton from "./sonar-button.js";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    margin: 0,
    padding: 0
  }
});
class MainButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          {" "}
          <DnsButton dnsButton={this.props.theState.tab} name="DNS" />
          <SonarButton sonarButton={this.props.theState.tab} name="Sonar" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MainButton);
