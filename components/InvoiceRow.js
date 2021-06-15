import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../web3";
import Project from "../project";

class InvoiceRow extends Component {
  onPay = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const project = await Project(this.props.address);
    await project.methods.recieveIncome(this.props.id, accounts[0]).send({
      from: accounts[0],
      value: this.props.income.amount,
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, income, expenseCount } = this.props;

    return (
      <Row disabled={income.paid} positive={!income.paid}>
        <Cell>{id}</Cell>
        <Cell>{income.description}</Cell>
        <Cell>{income.category}</Cell>
        <Cell>{income.customer}</Cell>
        <Cell>{web3.utils.fromWei(income.amount, "ether")}</Cell>

        <Cell>
          {income.paid ? null : (
            <Button
              color="green"
              onClick={this.onPay}
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              Pay Invoice
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default InvoiceRow;
