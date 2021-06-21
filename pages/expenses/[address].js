import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Project from "../../project";
import ExpenseTable from "../../components/ExpenseTable";

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

  render() {
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
        <ExpenseTable items={this.props.expenses} />
        <div>Found {this.props.expenseCount} expenses</div>
      </Layout>
    );
  }
}

export default RequestIndex;
