import React from "react";
import { Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import MaskedInput from "react-text-mask";
import Label from "../Label";
import styles from "./styles.module.scss";

export default function DoubleInputWithDropdown(props) {
  return (
    <Form.Group>
      <Label>{props.label}</Label>
      <InputGroup className={styles.container}>
        <DropdownButton
          className={styles.button}
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={props.buttonTitle}
        >
          {props.itens != null
            ? props.itens.map((item) => {
                return (
                  <Dropdown.Item key={item.value} onClick={props.onButtonClick}>
                    {item.label}
                  </Dropdown.Item>
                );
              })
            : ""}
        </DropdownButton>
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
          as={
            props.mask != null || props.pipe != null ? MaskedInput : FormControl
          }
          className={styles.default}
          defaultValue={props.defaultValueSecond}
          id={`${props.controlId}2`}
          {...props}
        />
      </InputGroup>
    </Form.Group>
  );
}
