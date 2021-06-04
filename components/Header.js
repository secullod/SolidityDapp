import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";

class Header extends Component {
  render() {
    console.log(this.props.address);
    return (
      <Menu
        style={{
          marginTop: "15px",
          backgroundColor: "#ffebc8",
          border: "none",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Link href="/">
          <Button
            icon="chain"
            color="black"
            content="ProjectChain"
            style={{
              padding: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "5px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          ></Button>
        </Link>
        {this.props.address ? (
          <Menu.Menu position="right">
            <Link href={`/project/${this.props.address}`}>
              <Button
                primary
                icon="folder"
                content="Project Home"
                floated="right"
                style={{
                  margin: "5px",
                }}
              ></Button>
            </Link>
            <Link href={`/invoice/${this.props.address}`}>
              <Button
                color="green"
                icon="add circle"
                floated="right"
                style={{
                  margin: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              ></Button>
            </Link>
            <Link href={`/expense/${this.props.address}`}>
              <Button
                color="red"
                icon="minus circle"
                floated="right"
                style={{
                  margin: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              ></Button>
            </Link>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Link href="/newproject">
              <Button
                primary
                icon="add circle"
                content="New Project"
                floated="right"
                style={{
                  margin: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              ></Button>
            </Link>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

export default Header;
