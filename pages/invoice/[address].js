import React, { Component } from "react";
import { Form, Button, Input, Message, Container } from "semantic-ui-react";
import Project from "../../project";
import web3 from "../../web3";
import Router from "next/router";
import Layout from "../../components/Layout";

class Invoice extends Component {
  state = {
    description: "",
    category: "",
    amount: "",
    address: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const project = await Project(this.props.address);
      await project.methods
        .addIncome(
          this.state.description,
          this.state.category,
          web3.utils.toWei(this.state.amount, "ether")
        )
        .send({ from: accounts[0] });
      Router.push(`/invoices/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({
      loading: false,
      amount: "",
      address: "",
      description: "",
      category: "",
    });
  };

  render() {
    return (
      <Layout address={this.props.address}>
        <Container text>
          <h3 style={{ marginTop: "30px" }}> Submit Invoice</h3>
          <Form
            onSubmit={this.onSubmit}
            error={!!this.state.errorMessage}
            style={{
              padding: "15px",
              backgroundColor: "#ffebc8",
              border: "none",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Form.Field>
              <label>Description</label>
              <Input
                placeholder="Supplies..."
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Input
                placeholder="Office Supplies..."
                value={this.state.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Amount</label>
              <Input
                placeholder="$120"
                value={this.state.amount}
                onChange={(e) => this.setState({ amount: e.target.value })}
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Submit
            </Button>
          </Form>
        </Container>
      </Layout>
    );
  }
}

export default Invoice;
