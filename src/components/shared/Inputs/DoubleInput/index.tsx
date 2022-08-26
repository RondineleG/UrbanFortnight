import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import MaskedInput from "react-text-mask";
import Label from "../Label";
import styles from "./styles.module.scss";

export default function DefaultInput(props) {
  return (
    <Form.Group>
      <Label>{props.label}</Label>
      <InputGroup>
        <FormControl
          as={
            props.mask != null || props.pipe != null ? MaskedInput : FormControl
          }
          className={styles.default}
          defaultValue={props.defaultValueFirst}
          id={`${props.controlId}1`}
          {...props}
        />
        <FormControl
          as={props.maskedInput ? MaskedInput : FormControl}
          className={styles.default}
          defaultValue={props.defaultValueSecond}
          id={`${props.controlId}2`}
          {...props}
        />
      </InputGroup>
    </Form.Group>
  );
}
