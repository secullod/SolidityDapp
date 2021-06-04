import React, { Component } from "react";
import {
  Button,
  Table,
  Row,
  Icon,
  Container,
  Header,
  Divider,

import Layout from "../components/Layout";
import Project from "../project";
import ExpenseRow from "../components/ExpenseRow";
import web3 from "../web3";

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
    let total = 0;

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

    incomes
      // .filter((expense) => expense.paid == false)
      .map((income) => {
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
        // return <ExpenseRow key={index} id={index} expense={expense} />;
      });

    expenses
      // .filter((expense) => expense.paid == false)
      .map((expense) => {
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
        // return <ExpenseRow key={index} id={index} expense={expense} />;
      });

    total = incTotal - expTotal;

    return {
      expenses,
      expenseCount,
      incomes,
      incomeCount,
      address,
      incDict,
      expDict,
      incTotal,
      expTotal,
      total,
    };
  }

  renderDesc(dic) {
    return (
      <Table.Row>
        <Table.Cell></Table.Cell>
        <Table.Cell>{dic.description}</Table.Cell>
        <Table.Cell>
          {web3.utils.fromWei(dic.amount, "ether")} <Icon name="ethereum" />
        </Table.Cell>
      </Table.Row>
    );
  }

  // renderTotal(dic) {
  //   // console.log(dic);
  //   // console.log(dic.amount);
  //   let total = 0;
  //   // Object.keys(dic).map((expense, index) => {
  //   //   total += dic[index][1];
  //   // });
  //   return total;
  // }

  renderRows() {
    // console.log(this.props.expenses);
    // console.log(this.props.);
    // let dict = {};
    // let initialValue = 0;
    // let total = 0;
    // this.props.expenses
    //   .filter((expense) => expense.paid == true)
    //   .map((expense) => {
    //     if (!dict[expense.category]) {
    //       dict[expense.category] = [
    //         { description: expense.description, amount: expense.amount },
    //       ];
    //     } else {
    //       dict[expense.category].push({
    //         description: expense.description,
    //         amount: expense.amount,
    //       });
    //     }
    //     total += parseFloat(web3.utils.fromWei(expense.amount, "ether"));
    //     // return <ExpenseRow key={index} id={index} expense={expense} />;
    //   });
    // console.log(dict);

    return Object.keys(this.props.expDict).map((key, value) => {
      return (
        <React.Fragment>
          <Table.Row>
            <Table.Cell style={{ border: "none" }}>
              <b> {key}</b>
            </Table.Cell>
          </Table.Row>

          {this.props.expDict[key].map((expense, index) => {
            //   console.log(dict[key][index]);
            return this.renderDesc(this.props.expDict[key][index]);
          })}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <b> Total {key}</b>
            </Table.Cell>

            <Table.Cell>
              <b>
                {Number(
                  this.props.expTotal
                    // dict[key]
                    //   .reduce(
                    //     (total, expense) =>
                    //       total +
                    //       parseFloat(web3.utils.fromWei(expense.amount, "ether")),
                    //     initialValue
                    //   )
                    .toFixed(8)
                )}
              </b>
              <Icon name="ethereum" />
            </Table.Cell>
          </Table.Row>
        </React.Fragment>
      );
    });
  }

  renderIncs() {
    // console.log(this.props.incomes);
    // let dict = {};
    // let initialValue = 0;
    // let total = 0;
    // this.props.incomes
    //   // .filter((expense) => expense.paid == false)
    //   .map((income) => {
    //     if (!dict[income.category]) {
    //       dict[income.category] = [
    //         { description: income.description, amount: income.amount },
    //       ];
    //     } else {
    //       dict[income.category].push({
    //         description: income.description,
    //         amount: income.amount,
    //       });
    //     }
    //     total += parseFloat(web3.utils.fromWei(income.amount, "ether"));
    //     // return <ExpenseRow key={index} id={index} expense={expense} />;
    //   });
    // console.log(dict);

    return Object.keys(this.props.expDict).map((key, value) => {
      return (
        <React.Fragment>
          <Table.Row>
            <Table.Cell style={{ border: "none" }}>
              <b> {key}</b>
            </Table.Cell>
          </Table.Row>

          {this.props.expDict[key].map((expense, index) => {
            //   console.log(this.props.expDict[key][index]);
            return this.renderDesc(this.props.expDict[key][index]);
          })}
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <b> Total {key}</b>
            </Table.Cell>

            <Table.Cell>
              <b>
                {Number(
                  this.props.expTotal
                    // this.props.expDict[key]
                    //   .reduce(
                    //     (total, expense) =>
                    //       total +
                    //       parseFloat(web3.utils.fromWei(expense.amount, "ether")),
                    //     initialValue
                    //   )
                    .toFixed(8)
                )}
              </b>
              <Icon name="ethereum" />
            </Table.Cell>
          </Table.Row>
        </React.Fragment>
      );
    });
  }

  render() {
    // const { Header, Row, HeaderCell, Body } = Table;
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
            <Table.Body>
              {/* <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header> */}
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
                {this.renderIncs()}
                <Table.Row>
                  <Table.Cell style={{ border: "none" }}></Table.Cell>
                  <Table.Cell style={{ border: "none" }}></Table.Cell>
                  <Table.Cell style={{ border: "none" }}>
                    <b>Total Income</b>
                  </Table.Cell>
                  <Table.Cell style={{ color: "green" }}>
                    <b>
                      {Number(
                        this.props.incTotal
                          // this.props.incomes
                          //   .reduce(
                          //     (total, income) =>
                          //       total +
                          //       parseFloat(
                          //         web3.utils.fromWei(income.amount, "ether")
                          //       ),
                          //     0
                          //   )
                          .toFixed(8)
                      )}
                    </b>
                    <Icon name="ethereum" />
                  </Table.Cell>
                </Table.Row>
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
                {this.renderRows()}
                <Table.Row>
                  <Table.Cell style={{ border: "none" }}></Table.Cell>
                  <Table.Cell style={{ border: "none" }}></Table.Cell>
                  <Table.Cell style={{ border: "none" }}>
                    <b>Total Expenses</b>
                  </Table.Cell>
                  <Table.Cell style={{ color: "red" }}>
                    <b>
                      {Number(
                        this.props.expenses
                          .reduce(
                            (total, expense) =>
                              total +
                              parseFloat(
                                web3.utils.fromWei(expense.amount, "ether")
                              ),
                            0
                          )
                          .toFixed(8)
                      )}

                      <Icon name="ethereum" />
                    </b>
                  </Table.Cell>
                </Table.Row>
                {/* </Container> */}
                {/* <Container
                text
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: "20px",
                  borderRadius: "5px",
                  marginTop: "20px",
                }}
              > */}
                <Table.Row>
                  <Table.Cell style={{ border: "none" }}></Table.Cell>
                  <Table.Cell style={{ border: "none" }}></Table.Cell>
                  <Table.Cell style={{ border: "none" }}>
                    <b>Net Income (Loss)</b>
                  </Table.Cell>
                  <Table.Cell style={{ color: "green" }}>
                    <b>
                      {Number(
                        this.props.incTotal
                          // this.props.expenses
                          //   .reduce(
                          //     (total, expense) =>
                          //       total +
                          //       parseFloat(
                          //         web3.utils.fromWei(expense.amount, "ether")
                          //       ),
                          //     0
                          //   )
                          .toFixed(8)
                      )}

                      <Icon name="ethereum" />
                    </b>
                  </Table.Cell>
                </Table.Row>
              </Container>
            </Table.Body>
          </Table>
        </Container>
      </Layout>
    );
  }
}

export default RequestIndex;
