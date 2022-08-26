import { Icon } from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import styles from "./styles.module.scss";

export default function SmallInput(props) {
  return (
    <Nav.Item className={props.collapsed?styles.collapsed:styles.menuButton} {...props}>
      <Nav.Link
        eventKey={props.eventKey}
        className={props.active ? styles.menuLinkActive : styles.menuLink}
      >
        <div className={styles.container}>
          <div className={styles.buttonMenuFlex}>
              <span className={props.collapsed?styles.textCollapsed:styles.bar}></span>
              <span className={styles.iconColumn}><i className={props.icon} /></span>
              <span className={props.collapsed?styles.textCollapsed:styles.textColumn}>{props.children}</span>
          </div>
        </div>
        
      </Nav.Link>
    </Nav.Item>
  );
}
