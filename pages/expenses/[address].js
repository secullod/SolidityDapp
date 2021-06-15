import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Project from "../../project";
import ExpenseRow from "../../components/ExpenseRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const project = await Project(address);
    const expenseCount = await project.methods.getExpensesCount().call();

    const expenses = await Promise.all(
      Array(parseInt(expenseCount))
        .fill()
        .map((element, index) => {
          return project.methods.expenses(index).call();
        })
    );

    return { address, expenses, expenseCount };
  }

  renderRows() {
    return this.props.expenses.map((expense, index) => {
      return (
        <ExpenseRow
          key={index}
          id={index}
          address={this.props.address}
          expense={expense}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout address={this.props.address}>
        <h3>Expenses</h3>
        <Link href={`/expense/${this.props.address}`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Expense
            </Button>
          </a>
        </Link>
        <Table
          style={{
            backgroundColor: "#ffebc8",
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Header>
            <Row>
              <HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                ID
              </HeaderCell>
              <HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                Description
              </HeaderCell>
              <HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                Category
              </HeaderCell>
              <HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                Vendor
              </HeaderCell>
              <HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                Amount
              </HeaderCell>
              <HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              ></HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.expenseCount} expenses</div>
      </Layout>
    );
  }
}

export default RequestIndex;
