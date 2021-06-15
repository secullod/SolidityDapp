import React, { Component } from "react";
import { List, Form, Button, Message, Input, Table } from "semantic-ui-react";
import web3 from "../web3";
import Account from "../factory";

class Invoice extends Component {
  state = {
    errorMessage: "",
    loading: false,
    account: "",
  };

  onPay = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });

      await Account.methods
        .recieveIncome(this.props.invoice, this.state.account)
        .send({
          from: this.state.account,
          value: web3.utils.toWei(this.props.amount, "ether"),
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      //   <List>
      //     <List.Item>
      //       <List.Header>Invoice</List.Header>
      //       {this.props.invoice}
      //     </List.Item>
      //     <List.Item>
      //       <List.Header>Description</List.Header>
      //       {this.props.description}
      //     </List.Item>
      //     <List.Item>
      //       <List.Header>Category</List.Header>
      //       {this.props.category}
      //     </List.Item>
      //     <List.Item>
      //       <List.Header>Amount</List.Header>
      //       {this.props.amount}
      //     </List.Item>
      //     <List.Item>
      //       <List.Header>Paid</List.Header>
      //       {this.props.paid ? "Yes" : "No"}
      //     </List.Item>
      //     <Button primary onClick={this.onPay}>
      //       Pay Invoice
      //     </Button>
      //     </List>

      <Table
        collapsing
        textAlign="center"
        columns={5}
        error={!!this.state.errorMessage}
        style={{
          backgroundColor: "#ffebc8",
          border: "none",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          marginTop: "20px",
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{
                backgroundColor: "#ffebc8",
              }}
            >
              Invoice
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                backgroundColor: "#ffebc8",
              }}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                backgroundColor: "#ffebc8",
              }}
            >
              Category
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                backgroundColor: "#ffebc8",
              }}
            >
              Amount
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                backgroundColor: "#ffebc8",
              }}
            >
              Paid
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{this.props.invoice}</Table.Cell>
            <Table.Cell>{this.props.description}</Table.Cell>
            <Table.Cell>{this.props.category}</Table.Cell>
            <Table.Cell>{this.props.amount} ether</Table.Cell>
            <Table.Cell>{this.props.paid ? "Yes" : "No"}</Table.Cell>
          </Table.Row>
        </Table.Body>

        {/* <Button primary onClick={this.onPay}>
            Pay Invoice
          </Button> */}

        <Table.Footer fullWidth>
          <Table.Row
            style={{
              backgroundColor: "#ffebc8",
            }}
          >
            <Table.HeaderCell
              colSpan="5"
              style={{
                backgroundColor: "#ffebc8",
              }}
            >
              <Message error header="Oops!" content={this.state.errorMessage} />
              <Button
                floated="right"
                primary
                onClick={this.onPay}
                loading={this.state.loading}
              >
                Pay Invoice
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default Invoice;
