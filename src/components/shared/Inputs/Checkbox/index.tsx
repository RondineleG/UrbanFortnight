import React from "react";
import { Form } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function DefaultInput(props) {
  return (
    <Form.Group className={styles.paddingLeft}>
      <Form.Check
        type="switch"
        id={props.controlId}
        className={styles.checkbox}
        inline
        label={props.label}
        {...props}
      />
    </Form.Group>
  );
}
