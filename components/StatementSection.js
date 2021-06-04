import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import Description from "./Description";

class StatementSection extends Component {
  render() {
    const { Row, Cell } = Table;
    const { dict, total } = this.props;

    return Object.keys(dict).map((key, value) => {
      return (
        <React.Fragment>
          <Row>
            <Cell style={{ border: "none" }}>
              <b>{key}</b>
            </Cell>
          </Row>
          {dict[key].map((expense, index) => {
            return <Description dict={dict[key][index]} />;
          })}
          <Row>
            <Cell></Cell>
            <Cell>
              <b>Total {key}</b>
            </Cell>
            <Cell>
              <b>{Number(total.toFixed(8))}</b>
              <Icon name="ethereum" />
            </Cell>
          </Row>
        </React.Fragment>
      );
    });
  }
}

export default StatementSection;
