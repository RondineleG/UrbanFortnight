import React from "react";
import { Nav } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function DefaultTab(props) {
  {
    return <Nav {...props}>{props.children}</Nav> 
  }
}