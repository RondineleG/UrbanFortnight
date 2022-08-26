import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import Label from "../Label";

export default function SelectOptions(props) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "var(--color-text-primary)",
      backgroundColor: state.isSelected
        ? "var(--color-bg-selected)"
        : "transparent",
      ":hover": {
        backgroundColor: !state.isSelected && "var(--color-bg-compliment)",
      },
    }),
    container: (provided, state) => ({
      ...provided,
      padding: "0",
      border: "0",
      fontSize: "1rem",
      marginBottom: "-10px",
      color: state.isSelected ? "red" : "blue",
      width: "inherit",
    }),
    control: (provided, state) => ({
      ...provided,
      height: !props.tableCase ? "23px" : "18px",
      minHeight: !props.tableCase ? "23px" : "18px",
      fontSize: "1rem",
      boxShadow: "none",
      backgroundColor: props.tableCase
        ? "transparent"
        : "var(--color-bg-default)",
      borderColor: !props.tableCase
        ? state.isFocused
          ? "#80BDFF"
          : "#CED4DA"
        : "transparent",
      ":hover": {
        borderColor: !props.tableCase
          ? state.isFocused
            ? "#80BDFF"
            : "#B3B3B3"
          : "transparent",
      },
    }),
    input: (provided, state) => ({
      ...provided,
      overflow: "hidden",
      color: "var(--color-text-primary)",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      marginTop: !props.tableCase ? "-4px" : "-6px",
      marginLeft: !props.tableCase ? "8.5px" : "-1px",
      padding: "0",
      border: "0",
      font: "400 14px Arial",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      marginTop: "0",
      padding: "0",
      border: "0",
      width: "16px",
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      marginTop: "0",
      padding: "0",
      border: "0",
      width: "12px",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      marginTop: !props.tableCase ? "-3px" : "-6px",
      paddingRight: "4px",
      border: "0",
      color: state.isSelected ? "red" : "blue",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      marginLeft: "2px",
      //color: !props.tableCase?"#495057":'red',
      color: state.isSelected ? "" : "var(--color-text-primary)",
      border: "0",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#939BA2",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      height: "12px",
      minHeight: "12px",
      backgroundColor: props.tableCase ? "transparent" : "#CCCCCC",
    }),
    menuList: (provided, state) => ({
      ...provided,
      font: "400 14px Arial",
      zIndex: "4",
    }),
    menuPortal: (provided, state) => ({
      ...provided,
      zIndex: "4",
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: "4",
      backgroundColor: "var(--color-bg-default)",
    }),
  };
  return (
    props.tableCase?
      <Select autosize={true} styles={customStyles} {...props} />
    :
    <Form.Group>
      <Label>{props.label}</Label>
      <Select autosize={true} styles={customStyles} {...props} />
    </Form.Group>
  );
}
