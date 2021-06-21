import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";
import styles from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <Menu className={styles.menucustom}>
        <Link href="/">
          <Button
            className={styles.custom}
            icon="chain"
            color="black"
            content="ProjectChain"
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
                className={styles.shadow}
              ></Button>
            </Link>
            <Link href={`/invoice/${this.props.address}`}>
              <Button
                color="green"
                icon="add circle"
                floated="right"
                className={styles.shadow}
              ></Button>
            </Link>
            <Link href={`/expense/${this.props.address}`}>
              <Button
                color="red"
                icon="minus circle"
                floated="right"
                className={styles.shadow}
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
                className={styles.shadow}
              ></Button>
            </Link>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

export default Header;
