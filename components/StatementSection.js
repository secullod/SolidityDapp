import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import Description from "./Description";
import web3 from "../web3";

class StatementSection extends Component {
  render() {
    const { Row, Cell } = Table;
    const { dict, total } = this.props;
    let ttotal = 0;

    return Object.keys(dict).map((key, value) => {
      ttotal = 0;
      return (
        <React.Fragment>
          <Row>
            <Cell style={{ border: "none" }}>
              <b>{key}</b>
            </Cell>
          </Row>
          {dict[key].map((expense, index) => {
            ttotal += Number(web3.utils.fromWei(expense.amount), "ether");

            return <Description dict={dict[key][index]} />;
          })}
          <Row>
            <Cell></Cell>
            <Cell>
              <b>Total {key}</b>
            </Cell>
            <Cell>
              <b>{Number(ttotal.toFixed(8))}</b>
              <Icon name="ethereum" />
            </Cell>
          </Row>
        </React.Fragment>
      );
    });
  }
}

export default StatementSection;
