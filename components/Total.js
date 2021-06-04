import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

class Total extends Component {
  render() {
    const { Row, Cell } = Table;
    const { total } = this.props;

    return (
      <Row>
        <Cell style={{ border: "none" }}></Cell>
        <Cell style={{ border: "none" }}></Cell>
        <Cell style={{ border: "none" }}>
          <b>Net Income (Loss)</b>
        </Cell>
        <Cell style={{ color: "green" }}>
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
