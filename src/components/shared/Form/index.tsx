import React from "react";
import { Form } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function DefaultForm(props) {
  return (
    <Form {...props}>
      {props.children}
    </Form>
  );
}
