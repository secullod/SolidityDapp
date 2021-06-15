import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../web3";
import Project from "../project";

class ExpenseRow extends Component {
  onPay = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const project = await Project(this.props.address);
    await project.methods.payExpense(this.props.id).send({
      from: accounts[0],
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, expense, expenseCount } = this.props;

    return (
      <Row disabled={expense.paid} positive={!expense.paid}>
        <Cell>{id}</Cell>
        <Cell>{expense.description}</Cell>
        <Cell>{expense.category}</Cell>
        <Cell>{expense.vendor}</Cell>
        <Cell>{web3.utils.fromWei(expense.amount, "ether")}</Cell>

        <Cell>
          {expense.paid ? null : (
            <Button color="green" onClick={this.onPay}>
              Pay
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default ExpenseRow;
