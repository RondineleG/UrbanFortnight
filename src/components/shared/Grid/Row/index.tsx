import React from "react";
import { Row } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function SmallRow(props) {
  return (
    <Row
      noGutters
      className={`${props.highligth && styles.columnStyleHighlight}
      ${!props.default && styles.columnStyle} 
      ${props.containerRow && styles.containerRow}`}
      {...props}
    >
      {props.title ? <span className={styles.font}>{props.title}</span> : ""}
      {props.children}
    </Row>
  );
}
