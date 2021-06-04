import React, { Component } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import Link from "next/link";
import web3 from "../web3";
import Project from "../project";

class IndexRow extends Component {
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
      <Row textAlign="center">
        <Cell>{id}</Cell>
        <Cell>{expense.name}</Cell>
        <Cell>{expense.desc}</Cell>

        <Cell>
          {web3.utils.fromWei(expense.balance, "ether")}{" "}
          <Icon name="ethereum" />
          ether
        </Cell>
        <Cell>{expense.incomes}</Cell>
        <Cell>{expense.expenses}</Cell>

        <Cell>
          <Link href={`/project/${this.props.address}`}>
            <Button
              primary
              icon="archive"
              content="View Project"
              floated="right"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            ></Button>
          </Link>
        </Cell>
      </Row>
    );
  }
}

export default IndexRow;
