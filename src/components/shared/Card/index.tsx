import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./styles.module.scss";

const CustomCard = (props) => {
  return (
    <Card className={styles.customTheme}>
      <Card.Header as="h5" className={styles.headerBar}>
        <span className={styles.leftComponent}>
          {props.headerName}
          {props.headerLeftComponent}
        </span>
        <span className={styles.rightComponent}>
          {props.headerRightComponent}
        </span>
      </Card.Header>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
};

export default CustomCard;
