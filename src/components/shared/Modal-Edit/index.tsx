import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from './styles.module.scss';
import { withTranslation } from "next-i18next";

type FormSettings = {
  title: string;
  targetForm: string;
  show: boolean;
  onSave: (any) => void;
  onCancel: () => void;
  i18nNamespaces?: ["modalAddEdit"];
  t?: any
}

class ModalEdit extends React.Component<FormSettings, {}> {
  constructor(props) {
    super(props);
    this.state = "";
  }

  render() {
    const floatLeft = {
      position: "absolute",
      left: "12px",
    };

    return (
      <Modal
        show={this.props.show}
        keyboard={true}
        onHide={this.props.onCancel}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton className="backgroundSecondary">
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            target={this.props.targetForm}
            onClick={this.props.onSave}
          >
            {this.props.t("saveChanges")}
          </Button>
          <Button
            variant="outline-danger"
            onClick={this.props.onCancel}
            className={styles.floatLeft}
          >
            {this.props.t("cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withTranslation(["modalAddEdit"])(ModalEdit);
