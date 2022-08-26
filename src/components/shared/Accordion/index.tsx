import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./styles.module.scss";
import {
  Accordion,
  Card as AccordionCard,
  Col,
} from "react-bootstrap";

export default function AccordionStyled(props) {
  return (
    <AccordionCard {...props} className={styles.container}>
      <Accordion.Toggle className={styles.header} as={AccordionCard.Header} eventKey={props.eventKey}>
        <Form.Group className={styles.formGroup} controlId={props.controlI}>
            <Form.Row className={styles.row}>
                <Col className={styles.checkboxRow}>
                    <Form.Check type="checkbox" defaultChecked={props.checked}/>
                </Col>
                <Col className={props.checked?styles.titleActive:styles.titleDefault}>
                    {props.title}
                </Col>
            </Form.Row>
        </Form.Group>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.eventKey}>
        <AccordionCard.Body>{props.children}</AccordionCard.Body>
      </Accordion.Collapse>
    </AccordionCard>
  );
}
