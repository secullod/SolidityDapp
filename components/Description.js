import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import web3 from "../web3";

class Description extends Component {
  render() {
    const { Row, Cell } = Table;
    const { amount, description } = this.props.dict;

    return (
      <Row>
        <Cell></Cell>
        <Cell>{description}</Cell>
        <Cell>
          {web3.utils.fromWei(amount, "ether")} <Icon name="ethereum" />
        </Cell>
      </Row>
    );
  }
}

export default Description;
