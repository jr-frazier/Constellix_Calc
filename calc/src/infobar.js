import React from "react";

class InfoBar extends React.Component {
  render() {
    const values = Object.values(this.props.dnsObj);
    const dnsTotal = values.reduce((a, b) => {
      if (isNaN(a)) {
        a = 0;
      } else if (isNaN(b)) {
        b = 0;
      }
      return a + b;
    });
    const sonarArr = this.props.sonar;
    let sonarTotal = 0;

    if (!sonarArr[0] === false) {
      console.log("THIS IS TRUE!!!!!!");
      sonarTotal = sonarArr.reduce((a, b) => {
        return a + b;
      });
    }

    console.log("!!!!!!!!!", sonarArr, "this is sonar total", sonarTotal);
    return (
      <div id="info-bar">
        <h3> Monthly Total: {parseFloat(dnsTotal + sonarTotal).toFixed(2)} </h3>
      </div>
    );
  }
}

export default InfoBar;
