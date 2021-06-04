import React, { Component } from "react";
import {
  Button,
  Grid,
  Card,
  Image,
  Icon,
  Table,
  Header,
} from "semantic-ui-react";
import Link from "next/link";
import Factory from "../factory";
import Project from "../project";
import Layout from "../components/Layout";
import web3 from "../web3";
import IndexRow from "../components/IndexRow";
import "semantic-ui-css/semantic.min.css";

class ProjectIndex extends Component {
  state = {
    account: "",
    loading: true,
  };

  static async getInitialProps() {
    const projs = await Factory.methods.getDeployedCampaigns().call();
    const projects = await projs.map((project) => {
      return Project(project);
    });
    const values = await projects.map(async (project) => {
      // const balance = await web3.eth.getBalance(project._address);
      return {
        desc: await project.methods.projectDescription().call(),
        name: await project.methods.projectName().call(),
        incomes: await project.methods.getIncomesCount().call(),
        expenses: await project.methods.getExpensesCount().call(),
        // balance: await web3.utils.fromWei(balance, "ether"),
        balance: await web3.eth.getBalance(project._address),
        address: await project._address,
      };
    });

    const results = await Promise.all(values);
    return { results };
  }

  renderCampaigns() {
    console.log(this.props.results);
    const items = this.props.results.map((address) => {
      return {
        header: address.name,
        description: (
          <Card.Content extra>
            <p>{address.desc}</p>
            <p>
              <b>Project Balance </b>
              {address.balance}
              <Icon name="ethereum" />
              ether
            </p>
            <p>
              <b>Income Count </b> {address.incomes}
            </p>
            <p>
              <b>Expense Count </b> {address.expenses}
            </p>
            <Link href={`/project/${address.address}`}>
              <a>
                <Icon name="arrow circle right" />
                View Project
              </a>
            </Link>
          </Card.Content>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  renderRows() {
    return this.props.results.map((expense, index) => {
      return (
        <IndexRow
          key={index}
          id={index}
          address={expense.address}
          expense={expense}
        />
      );
    });
  }

  render() {
    return (
      <Layout address={this.props.address}>
        <Grid>
          <Grid.Column style={{ position: "relative", display: "flex" }}>
            <div
              style={{
                position: "absolute",
                top: 250,
                right: 90,
                zIndex: "1",
                fontFamily: "Arial",
              }}
            >
              <h1 style={{ fontSize: "80px" }}>ProjectChain</h1>
              <h1 style={{ marginBottom: "30px" }}>
                Project expense management
              </h1>
              <Link href="/newproject">
                <a>
                  <Button
                    primary
                    size="massive"
                    icon="add circle"
                    content="New Project"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  ></Button>
                </a>
              </Link>
            </div>
            <Image
              style={{
                objectFit: "contain",
                borderRadius: "5px",
                marginTop: "10px",

                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              src="https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2251&q=80"
            />
          </Grid.Column>
        </Grid>

        {/* <div>
          <h3>Current Projects</h3>
          {this.renderCampaigns()}
        </div> */}
        <Grid>
          <Grid.Row columns={2} style={{ paddingBottom: "5px" }}>
            <Grid.Column>
              <Header
                as="h3"
                floated="left"
                icon="folder"
                content="Current Projects"
              />
            </Grid.Column>
            <Grid.Column>
              <Link href="/newproject">
                <a>
                  <Button
                    className="cat"
                    primary
                    floated="right"
                    icon="add circle"
                    content="New Project"
                    style={{
                      marginBottom: 10,
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                  ></Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table
          style={{
            backgroundColor: "#ffebc8",
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                ID
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                Name
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
                Balance
              </Table.HeaderCell>
              <Table.HeaderCell style={{ backgroundColor: "#ffebc8" }}>
                Income Count
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              >
                Expense Count
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  backgroundColor: "#ffebc8",
                }}
              ></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
      </Layout>
    );
  }
}

export default ProjectIndex;
