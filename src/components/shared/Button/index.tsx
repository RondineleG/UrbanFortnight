import React from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function DefaultButton(props) {
  {
    return props.isDropdown ? (
      <DropdownButton className={styles.defaultButton} size="sm" title={props.children} {...props}>
        {props.itens != null
          ? props.itens.map((item) => {
              return (
                <Dropdown.Item key={item.value} id={item.value} onClick={props.onButtonClick}>
                  {item.label}
                </Dropdown.Item>
              );
            })
          : ""}
      </DropdownButton>
    ) : (
      <Button className={`${styles.defaultButton}`} size="sm" {...props}>{props.children}</Button>
    );
  }
}
