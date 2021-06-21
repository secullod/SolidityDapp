import React, { Component } from "react";
import Project from "../../project.js";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import Layout from "../../components/Layout.js";
import InvoiceTable from "../../components/InvoiceTable";

class VendorPortal extends Component {
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

  render() {
    return (
      <Layout address={this.props.address}>
        <h3
          style={{
            marginTop: "30px",
          }}
        >
          Invoices
        </h3>
        <Link href={`/invoice/${this.props.address}`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Invoice
            </Button>
          </a>
        </Link>
        <InvoiceTable items={this.props.incomes} />
        <div>Found {this.props.incomeCount} invoices</div>
      </Layout>
    );
  }
}

export default VendorPortal;
