import React, { Component } from "react";
import { Button, Grid, Header, Card, Container, Icon } from "semantic-ui-react";
import Link from "next/link";
import Project from "../../project";
import Layout from "../../components/Layout";
import web3 from "../../web3";

class ProjectIndex extends Component {
  state = {
    account: "",
    loading: true,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    const project = await Project(address);

    const values = await {
      desc: await project.methods.projectDescription().call(),
      name: await project.methods.projectName().call(),
      incomes: await project.methods.getIncomesCount().call(),
      expenses: await project.methods.getExpensesCount().call(),
      balance: await web3.eth.getBalance(address),
      address: await project._address,
    };
    return { values };
  }

  render() {
    return (
      <Layout address={this.props.values.address}>
        <Container text>
          <Grid>
            <Grid.Row
              style={{
                marginTop: "30px",
              }}
            >
              <Grid.Column
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Header as="h1">Project: {this.props.values.name}</Header>
                <Header
                  as="h3"
                  style={{
                    marginTop: "0px",
                  }}
                >
                  Description: {this.props.values.desc}
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Card
              fluid
              raised
              style={{
                padding: "20px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "#ffebc8",
              }}
            >
              <Grid.Row>
                <Grid.Column
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card.Content>
                    <b>Address: </b>
                    {this.props.values.address}
                    <br />
                    <b>Balance: </b>
                    {web3.utils.fromWei(this.props.values.balance, "ether")}
                    <Icon name="ethereum" />
                    ether
                    <br />
                  </Card.Content>
                </Grid.Column>
              </Grid.Row>
            </Card>
            <Card
              fluid
              style={{
                padding: "20px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "#ffebc8",
              }}
            >
              <Grid.Row>
                <Grid.Column
                  textAlign="center"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Header
                    as="h3"
                    icon="add circle"
                    content="New Item"
                    style={{
                      marginBottom: "20px",
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign="center">
                <Grid.Column>
                  <Link href={`/expense/${this.props.values.address}`}>
                    <Button
                      color="red"
                      size="huge"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      Add Expense
                    </Button>
                  </Link>
                  <Link href={`/invoice/${this.props.values.address}`}>
                    <Button
                      color="green"
                      size="huge"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      Add Revenue
                    </Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Card>
            <Card
              fluid
              style={{
                padding: "20px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                backgroundColor: "#ffebc8",
              }}
            >
              <Grid.Row>
                <Grid.Column
                  textAlign="center"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Header
                    as="h3"
                    icon="eye"
                    content="View Items"
                    style={{
                      marginBottom: "20px",
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign="center">
                <Grid.Column>
                  <Link href={`/expenses/${this.props.values.address}`}>
                    <Button
                      color="blue"
                      size="huge"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      View Expenses
                    </Button>
                  </Link>
                  <Link href={`/invoices/${this.props.values.address}`}>
                    <Button
                      color="yellow"
                      size="huge"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      View Revenue
                    </Button>
                  </Link>
                  <Link href={`/incomeStatement/${this.props.values.address}`}>
                    <Button
                      color="purple"
                      size="huge"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      View Income Statement
                    </Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Card>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default ProjectIndex;
