import React from "react";
import { Col } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function SmallRow(props) {
  return (
    <Col
      className={`${props.collapsed && styles.collapsed} ${
        props.verticalMenuOpened && styles.verticalMenu
      } ${props.highlight && styles.highlight} ${
        props.highlightTop && styles.highlightTop
      } ${props.highlightBottom && styles.highlightBottom}`}
      {...props}
    >
      {props.children}
    </Col>
  );
}
