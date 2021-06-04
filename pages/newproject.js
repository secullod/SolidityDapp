import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  Form,
  Button,
  Input,
  Message,
  Container,
  Card,
  Header,
  Icon,
} from "semantic-ui-react";
import factory from "../factory";
import web3 from "../web3";
import { Router } from "next/router";

class NewProject extends Component {
  state = {
    description: "",
    name: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.name, this.state.description)
        .send({
          from: accounts[0],
        });
      Router.push("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout address={this.props.address}>
        <Container text>
          <Header as="h1" style={{ marginTop: "30px" }}>
            <Icon name="open folder"></Icon>Create Project
          </Header>
          <Card
            fluid
            style={{
              padding: "15px",
              backgroundColor: "#ffebc8",
              border: "none",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Name</label>
                <Input
                  value={this.state.name}
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                />
                <label>Description</label>
                <Input
                  value={this.state.description}
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                />
              </Form.Field>
              <Message error header="Oops!" content={this.state.errorMessage} />
              <Button loading={this.state.loading} primary>
                Create!
              </Button>
            </Form>
          </Card>
        </Container>
      </Layout>
    );
  }
}

export default NewProject;
