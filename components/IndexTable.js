import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import styles from "./InsertTable.module.css";
import IndexRow from "./IndexRow";

class InsertTable extends Component {
  renderRows(items) {
    return items.map((income, index) => {
      return (
        <IndexRow
          key={index}
          id={index}
          address={income.address}
          income={income}
        />
      );
    });
  }

  render() {
    const { Row, Header, HeaderCell, Body } = Table;
    const { items } = this.props;

    return (
      <Table
        style={{
          backgroundColor: "#ffebc8",
          border: "none",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Header>
          <Row className={styles.th}>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Balance</HeaderCell>
            <HeaderCell>Vendor</HeaderCell>
            <HeaderCell>Income Count</HeaderCell>
            <HeaderCell>Expense Count</HeaderCell>
            <HeaderCell></HeaderCell>
          </Row>
        </Header>
        <Body>{this.renderRows(items)}</Body>
      </Table>
    );
  }
}

export default InsertTable;
