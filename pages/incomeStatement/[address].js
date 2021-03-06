import React, { Component } from "react";
import { Table, Container } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Project from "../../project";
import web3 from "../../web3";
import StatementSection from "../../components/StatementSection";
import Total from "../../components/Total";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const project = await Project(address);
    const expenseCount = await project.methods.getExpensesCount().call();
    const incomeCount = await project.methods.getIncomesCount().call();
    let expDict = {};
    let incDict = {};
    let incTotal = 0;
    let expTotal = 0;
    let ttotal = 0;

    const expenses = await Promise.all(
      Array(parseInt(expenseCount))
        .fill()
        .map((element, index) => {
          return project.methods.expenses(index).call();
        })
    );

    const incomes = await Promise.all(
      Array(parseInt(incomeCount))
        .fill()
        .map((element, index) => {
          return project.methods.incomes(index).call();
        })
    );

    incomes.map((income) => {
      if (!incDict[income.category]) {
        incDict[income.category] = [
          { description: income.description, amount: income.amount },
        ];
      } else {
        incDict[income.category].push({
          description: income.description,
          amount: income.amount,
        });
      }
      incTotal += parseFloat(web3.utils.fromWei(income.amount, "ether"));
    });

    expenses.map((expense) => {
      if (!expDict[expense.category]) {
        expDict[expense.category] = [
          { description: expense.description, amount: expense.amount },
        ];
      } else {
        expDict[expense.category].push({
          description: expense.description,
          amount: expense.amount,
        });
      }
      expTotal += parseFloat(web3.utils.fromWei(expense.amount, "ether"));
    });

    ttotal = incTotal - expTotal;
    expTotal = -expTotal;
    return {
      address,
      incDict,
      expDict,
      incTotal,
      expTotal,
      ttotal,
    };
  }

  render() {
    const { Header, Body } = Table;
    return (
      <Layout address={this.props.address}>
        <Container text>
          <Header
            as="h1"
            style={{
              marginTop: "30px",
            }}
          >
            Profit & Loss
          </Header>
          <Table
            compact="very"
            size="small"
            columns={4}
            style={{
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#ffebc8",
            }}
          >
            <Body>
              <Container
                text
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: "20px",
                  borderRadius: "5px",
                  marginBottom: "20px",
                }}
              >
                <Header
                  as="h3"
                  icon="circle add"
                  content="Income"
                  style={{
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                />

                <StatementSection
                  dict={this.props.incDict}
                  total={this.props.incTotal}
                />

                <Total label={"Total Income"} total={this.props.incTotal} />
              </Container>

              <Container
                text
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <Header
                  as="h3"
                  icon="circle minus"
                  content="Expenses"
                  style={{
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                />
                <StatementSection
                  dict={this.props.expDict}
                  total={this.props.expTotal}
                />
                <Total label={"Total Expenses"} total={this.props.expTotal} />
                <Total label={"Net Income (Loss)"} total={this.props.ttotal} />
              </Container>
            </Body>
          </Table>
        </Container>
      </Layout>
    );
  }
}

export default RequestIndex;
