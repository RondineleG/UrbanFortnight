import React from "react";
import { Tab } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function DefaultTab(props) {
  {
    return <Tab.Pane {...props}>{props.children}</Tab.Pane>
  }
}