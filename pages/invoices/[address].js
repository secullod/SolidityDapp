import React, { Component } from "react";
import Project from "../../project.js";
import Link from "next/link";
import { Form, Button, Message, Input, Grid, Table } from "semantic-ui-react";
import Layout from "../../components/Layout.js";
import web3 from "../../web3";
import Invoice from "../../components/Invoice";
import InvoiceRow from "../../components/InvoiceRow";

class VendorPortal extends Component {
  state = {
    errorMessage: "",
    description: "",
    amount: "",
    category: "",
    invoice: "",
    invoicesub: "",
    paid: "",
    submitted: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    const project = await Project(address);
    const incomeCount = await project.methods.getIncomesCount().call();

    const incomes = await Promise.all(
      Array(parseInt(incomeCount))
        .fill()
        .map((element, index) => {
          return project.methods.incomes(index).call();
        })
    );
    return { incomes, incomeCount, address };
  }

  renderRows() {
    return this.props.incomes.map((income, index) => {
      return (
        <InvoiceRow
          key={index}
          id={index}
          address={this.props.address}
          income={income}
        />
      );
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitted: false });
    const project = await Project(this.props.address);
    const data = await project.methods.incomes(this.state.invoice).call();
    this.setState({
      invoicesub: this.state.invoice,
      description: data[0],
      category: data[1],
      amount: data[2],
      paid: data[4],
      submitted: true,
    });
  };

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout address={this.props.address}>
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width={8}>
              <Form onSubmit={this.onSubmit}>
                <h3>Search by Invoice Number</h3>

                <Form.Field>
                  <Input
                    value={this.state.invoice}
                    onChange={(e) => this.setState({ invoice: e.target.value })}
                  ></Input>
                </Form.Field>
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />
                <Button primary>Submit</Button>
              </Form>
            </Grid.Column>

            <Grid.Column width={8}>
              {this.state.submitted && (
                <Invoice
                  invoice={this.state.invoicesub}
                  category={this.state.category}
                  amount={this.state.amount}
                  description={this.state.description}
                  paid={this.state.paid}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <h3>Invoices</h3>
        <Link href={`/invoice/${this.props.address}`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Invoice
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Category</HeaderCell>
              <HeaderCell>Vendor</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.incomeCount} pending invoices</div>
      </Layout>
    );
  }
}

export default VendorPortal;
