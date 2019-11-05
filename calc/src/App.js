import React, { Component } from "react";
import "typeface-roboto";
import Paper from "@material-ui/core/Paper";
import MainButton from "./mainbutton.js";
import DnsCalc from "./dns/dns-calc.js";
import SonarCalc from "./sonar/sonar-calc.js";
import Monthly from "./monthly";
import Tab from "./tab.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Banner from "./dns/ds-banner.js";
import PropTypes from "prop-types";
import DnsCalculation from "./dns/dns-calculations";
import Logo from "./constellix-calc-logo.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderDNS = this.renderDNS.bind(this);
    this.renderElements = this.renderElements.bind(this);
    this.renderSonar = this.renderSonar.bind(this);
    this.state = {
      value: [1, 2, 3],
      calcPage: 1,
      dns: {
        domainPrice: 0,
        records: 0,
        queries: 0,
        gtd: 0,
        geoprox: 0,
        ipfilter: 0,
        aname: 0,
        addusers: 0,
        sonar: 0
      },
      dnsCounts: {
        domainCount: 0,
        recordCount: 0,
        queryCount: 0,
        gtdCount: 0,
        geoProxCount: 0,
        ipFilterCount: 0,
        anameCount: 0,
        addUserCount: 0,
        domainNumber: 0
      },
      sonar: [],
      sonar_check: [],
      total: 0,
      tab: true
    };
  }

  // Renderst the page associated with the tab that was selected
  handleClick(i) {
    const x = document.getElementById(i);
    if (parseInt(x.id, 10) === 1 && x.className === "tab-inactive") {
      return (
        (x.className = "tab-active"),
        (document.getElementById(2).className = "tab-inactive"),
        (document.getElementById(3).className = "tab-inactive"),
        this.setState({ calcPage: 1 })
      );
    } else if (parseInt(x.id, 10) === 2 && x.className === "tab-inactive") {
      return (
        (x.className = "tab-active"),
        (document.getElementById(1).className = "tab-inactive"),
        (document.getElementById(3).className = "tab-inactive"),
        this.setState({ calcPage: 2 })
      );
    } else if (parseInt(x.id, 10) === 3 && x.className === "tab-inactive") {
      return (
        (x.className = "tab-active"),
        (document.getElementById(1).className = "tab-inactive"),
        (document.getElementById(2).className = "tab-inactive"),
        this.setState({ calcPage: 3 })
      );
    }
  }

  // Renders the Monthy, DNS, and Sonar tab
  renderTab(i) {
    const num = i + 1;
    return (
      <Tab
        id={this.state.value[i]}
        onClick={() => this.handleClick(num)}
        className={this.state.className}
      />
    );
  }

  //Deletes check from sonar in state
  deleteSonar(i) {
    const sonarState = this.state.sonar;
    const sonarCheck = this.state.sonar_check;
    sonarCheck.splice(i - 1, 1);
    sonarState.splice(i - 1, 1);
    this.setState({ sonar: sonarState, sonar_check: sonarCheck });
  }

  //Calculates DNS Values that were passed from dns-calc.js
  renderDNS(i) {
    if (i[0] === "domains") {
      let price = 0;
      let recordCount = this.state.dnsCounts.recordCount;
      const domainCount = i[1];
      if (domainCount === 1) {
        price = 5;
        if (recordCount - domainCount * 100 >= 100) {
          let records = (recordCount - domainCount * 100) / 100;
          let price = Math.floor(records) * 0.5;
          const x = this.state.dns;
          const obj = {};
          obj["dns"] = x;
          obj.dns.records = price;
          this.setState(obj);
        } else if (recordCount - domainCount * 100 <= 100) {
          const x = this.state.dns;
          const obj = {};
          obj["dns"] = x;
          obj.dns.records = 0;
          this.setState(obj);
        }
      } else if (domainCount > 1 && domainCount < 26) {
        price = (domainCount - 1) * 0.5 + 5;
        if (recordCount - domainCount * 100 >= 100) {
          let records = (recordCount - domainCount * 100) / 100;
          let price = Math.floor(records) * 0.5;
          const x = this.state.dns;
          const obj = {};
          obj["dns"] = x;
          obj.dns.records = price;
          this.setState(obj);
        } else if (recordCount - domainCount * 100 <= 100) {
          const x = this.state.dns;
          const obj = {};
          obj["dns"] = x;
          obj.dns.records = 0;
          this.setState(obj);
        }
      } else {
        price = (domainCount - 26) * 0.095 + 17;
        if (recordCount - domainCount * 100 >= 100) {
          let records = (recordCount - domainCount * 100) / 100;
          let price = Math.floor(records) * 0.5;
          const x = this.state.dns;
          const obj = {};
          obj["dns"] = x;
          obj.dns.records = price;
          this.setState(obj);
        } else if (recordCount - domainCount * 100 <= 100) {
          const x = this.state.dns;
          const obj = {};
          obj["dns"] = x;
          obj.dns.records = 0;
          this.setState(obj);
        }
      }
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, domainPrice: price },
        dnsCounts: { ...this.state.dnsCounts, domainCount: domainCount },
        dnsCounts: { ...this.state.dnsCounts, domainNumber: i[1] }
      });
    }
    this.renderElements(i);
  }

  renderElements(i) {
    if (i[0] === "records") {
      let price = 0;
      const recordCount = i[1] - this.state.dnsCounts.domainNumber * 100;

      if (recordCount >= 100) {
        const recordTotal =
          (i[1] - this.state.dnsCounts.domainNumber * 100) / 100;
        price = Math.floor(recordTotal) * 0.5;
      }
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, records: price },
        dnsCounts: { ...this.state.dnsCounts, recordCount: i[1] }
      });
    } else if (i[0] === "queries") {
      let price = 0;
      if (i[1] > 0 && i[1] < 1000) {
        price = i[1] * 0.395;
      } else if (i[1] >= 1000) {
        price = (i[1] - 999) * 0.195 + 394.61;
      }
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, queries: price },
        dnsCounts: { ...this.state.dnsCounts, queryCount: i[1] }
      });
    } else if (i[0] === "gtd") {
      let price = 0;
      if (i[1] === 1) {
        price = 5;
      } else if (i[1] > 1 && i[1] < 101) {
        price = (i[1] - 1) * 1 + 5;
      } else if (i[1] > 100) {
        price = (i[1] - 100) * 0.1 + 104;
      }
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, gtd: price },
        dnsCounts: { ...this.state.dnsCounts, gtdCount: i[1] }
      });
    } else if (i[0] === "geoprox") {
      const price = i[1] * 0.06;
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, geoprox: price },
        dnsCounts: { ...this.state.dnsCounts, geoProxCount: i[1] }
      });
    } else if (i[0] === "ipfilter") {
      const price = i[1] * 0.06;
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, ipfilter: price },
        dnsCounts: { ...this.state.dnsCounts, ipFilterCount: i[1] }
      });
    } else if (i[0] === "aname") {
      const price = i[1] * 0.1;
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, aname: price },
        dnsCounts: { ...this.state.dnsCounts, anameCount: i[1] }
      });
    } else if (i[0] === "addusers") {
      const price = i[1] * 2;
      this.setState({
        ...this.state,
        dns: { ...this.state.dns, addusers: price },
        dnsCounts: { ...this.state.dnsCounts, addUserCount: i[1] }
      });
    }
  }

  renderSonar(i) {
    if (Object.keys(i[0])[0] === "check") {
      let cost = [];
      let index = 0;
      let checkTotal = [];

      i.map(x => {
        cost[index] = 0;
        let totalChecked = 0;
        const checkPolicy = x.check.checkPolicy;
        const checkAmount = x.check.checkAmount;

        //Check Location Objects
        const naObj = x.check.checkLocations.North_America;
        const euObj = x.check.checkLocations.Europe;
        const apObj = x.check.checkLocations.Asia_Pacific;
        const ocObj = x.check.checkLocations.Oceania;
        const protocol = x.check.checkType;

        // Runs if "Once Per Site" Check Policy is selected
        if (x.check.checkPolicy === "Once Per Site") {
          for (const key in naObj) {
            naObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }
          for (const key in euObj) {
            euObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }
          for (const key in apObj) {
            apObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }
          for (const key in ocObj) {
            ocObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }

          if (totalChecked) {
            const multiplier = x.check.checkInterval / totalChecked;
            for (const key in naObj) {
              if (protocol === "HTTP") {
                naObj[key]
                  ? (cost[index] += 0.00004 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "HTTPS") {
                naObj[key]
                  ? (cost[index] += 0.00006 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "TCP") {
                naObj[key]
                  ? (cost[index] += 0.00002 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "DNS") {
                naObj[key]
                  ? (cost[index] += 0.00002 * multiplier)
                  : (cost[index] += 0);
              }
            }
            for (const key in euObj) {
              if (protocol === "HTTP") {
                euObj[key]
                  ? (cost[index] += 0.00004 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "HTTPS") {
                euObj[key]
                  ? (cost[index] += 0.00006 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "TCP") {
                euObj[key]
                  ? (cost[index] += 0.00002 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "DNS") {
                euObj[key]
                  ? (cost[index] += 0.00002 * multiplier)
                  : (cost[index] += 0);
              }
            }
            for (const key in apObj) {
              if (protocol === "HTTP") {
                apObj[key]
                  ? (cost[index] += 0.00006 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "HTTPS") {
                apObj[key]
                  ? (cost[index] += 0.00008 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "TCP") {
                apObj[key]
                  ? (cost[index] += 0.00003 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "DNS") {
                apObj[key]
                  ? (cost[index] += 0.00003 * multiplier)
                  : (cost[index] += 0);
              }
            }
            for (const key in ocObj) {
              if (protocol === "HTTP") {
                ocObj[key]
                  ? (cost[index] += 0.00008 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "HTTPS") {
                ocObj[key]
                  ? (cost[index] += 0.0001 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "TCP") {
                ocObj[key]
                  ? (cost[index] += 0.00003 * multiplier)
                  : (cost[index] += 0);
              } else if (protocol === "DNS") {
                ocObj[key]
                  ? (cost[index] += 0.00003 * multiplier)
                  : (cost[index] += 0);
              }
            }
          }
          //End of "Once Per Site"
        } else {
          //Runs if "Simultaneous" Check Policy is selected
          const checkInt = x.check.checkInterval;
          for (const key in naObj) {
            if (protocol === "HTTP") {
              naObj[key]
                ? (cost[index] += 0.00004 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "HTTPS") {
              naObj[key]
                ? (cost[index] += 0.00006 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "TCP") {
              naObj[key]
                ? (cost[index] += 0.00002 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "DNS") {
              naObj[key]
                ? (cost[index] += 0.00002 * checkInt)
                : (cost[index] += 0);
            }
            naObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }
          for (const key in euObj) {
            if (protocol === "HTTP") {
              euObj[key]
                ? (cost[index] += 0.00004 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "HTTPS") {
              euObj[key]
                ? (cost[index] += 0.00006 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "TCP") {
              euObj[key]
                ? (cost[index] += 0.00002 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "DNS") {
              euObj[key]
                ? (cost[index] += 0.00002 * checkInt)
                : (cost[index] += 0);
            }
            euObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }
          for (const key in apObj) {
            if (protocol === "HTTP") {
              apObj[key]
                ? (cost[index] += 0.00006 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "HTTPS") {
              apObj[key]
                ? (cost[index] += 0.00008 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "TCP") {
              apObj[key]
                ? (cost[index] += 0.00003 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "DNS") {
              apObj[key]
                ? (cost[index] += 0.00003 * checkInt)
                : (cost[index] += 0);
            }
            apObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }
          for (const key in ocObj) {
            if (protocol === "HTTP") {
              ocObj[key]
                ? (cost[index] += 0.00008 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "HTTPS") {
              ocObj[key]
                ? (cost[index] += 0.0001 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "TCP") {
              ocObj[key]
                ? (cost[index] += 0.00003 * checkInt)
                : (cost[index] += 0);
            } else if (protocol === "DNS") {
              ocObj[key]
                ? (cost[index] += 0.00003 * checkInt)
                : (cost[index] += 0);
            }
            ocObj[key] ? (totalChecked += 1) : (totalChecked += 0);
          }
          //End of "Simultaneous"
        } // else if ends

        checkTotal[index] = parseFloat(
          (cost[index] * x.check.checkAmount).toFixed(2)
        );

        // Updates sonar in state
        const sonarCost = this.state.sonar;
        sonarCost[index] = cost[index] * checkAmount;
        this.setState({ sonar: sonarCost });

        //Updates sonar_check in state
        const sonarCheck = this.state.sonar_check;
        sonarCheck[index] = i[index];
        this.setState({ sonar_check: sonarCheck });

        index += 1;
      });
    }
  }

  changeButtons() {
    if (this.state.tab === true) {
      this.setState({ tab: false });
    } else {
      this.setState({ tab: true });
    }
  }

  render() {
    const calcPage = this.state.calcPage;
    const { theme } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={10}>
          <Paper className="app">
            <Grid container direction="row" spacing={24}>
              <Grid item xs={12} className="header">
                <Grid container direction="row">
                  <Grid item xs={7} onClick={() => this.changeButtons()}>
                    <MainButton theState={this.state} />
                  </Grid>
                  <Grid item xs={5}>
                    <img src={Logo} alt="Constelix Calculator" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} className="group-1">
                <Grid container direction="column">
                  <Grid item>
                    <DnsCalc
                      theTabState={this.state.tab}
                      getTotal={total => this.renderDNS(total)}
                    />
                    <SonarCalc
                      theTabState={this.state.tab}
                      getTotal={total => this.renderSonar(total)}
                      deleteSonar={x => this.deleteSonar(x)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} className="group-2">
                <Grid container direction="column" spacing={40}>
                  <Grid item>
                    <Banner bannerName="Monthly Total" />
                  </Grid>
                  <Grid item>
                    <Monthly
                      obj={this.state.dns}
                      domainCount={this.state.dnsCounts.domainCount}
                      counts={this.state.dnsCounts}
                      sonarTotal={this.state.sonar}
                      sonarCheck={this.state.sonar_check}
                      domainNumber={this.state.dnsCounts.domainNumber}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default App;
