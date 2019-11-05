import React from "react";

function dnsCalculations() {
  function renderDNS(i) {
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

  function renderElements(i) {
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
}

export default dnsCalculations;
