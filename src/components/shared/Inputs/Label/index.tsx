import React from "react";
import Form from "react-bootstrap/Form";
import styles from './styles.module.scss';


export default function Label(props) { 
    return <Form.Label className={styles.label}{...props}> {props.children} </Form.Label>
  }

