import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

class Total extends Component {
  render() {
    const { Row, Cell } = Table;
    const { total, label } = this.props;
    let color = total < 0 ? "red" : "green";

    return (
      <Row>
        <Cell style={{ border: "none" }}></Cell>
        <Cell style={{ border: "none" }}></Cell>
        <Cell style={{ border: "none" }}>
          <b>{label}</b>
        </Cell>
        <Cell style={{ color: color }}>
          <b>
            {Number(total.toFixed(8))}
            <Icon name="ethereum" />
          </b>
        </Cell>
      </Row>
    );
  }
}

export default Total;
