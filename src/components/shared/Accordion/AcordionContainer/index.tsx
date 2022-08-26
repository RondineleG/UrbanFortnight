import React from "react";
import styles from "./styles.module.scss";
import { Accordion } from "react-bootstrap";

export default function DefaultAccordion(props) {
  return <Accordion {...props}>{props.children}</Accordion>;
}
