import React, { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import { withTranslation } from "next-i18next";
import styles from './styles.module.scss';

type RegisterSettings = {
  onAddClick: ()=> void;
  headerName: string | ReactNode;
  children: ReactNode;
  t?: any;
  i18nNamespaces?: ["register"];
}

const Register = ({ onAddClick, headerName, children, t }: RegisterSettings) => {

  return (
    <Card className="custom-theme">
      <Card.Header as="h5">
        {headerName}
        <Button
          variant="primary"
          type="button"
          onClick={onAddClick}
          className={styles.floatRigth}
          size="sm"
        >
          {t("add")}
        </Button>
        <Dropdown className={styles.floatRigth}>
          <Dropdown.Toggle
            disabled
            split
            variant="outline-primary"
            id="dropdown-basic"
            className={styles.marginRight}
            size="sm"
          >
            {t("options")}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="">1</Dropdown.Item>
            <Dropdown.Item href="">2</Dropdown.Item>
            <Dropdown.Item href="">3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default withTranslation(["register"])(Register);
