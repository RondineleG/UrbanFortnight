import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
 import { withTranslation } from "next-i18next";

type FormSettings = {
  title: string;
  targetForm: string;
  show: boolean;
  onSave: (any) => void;
  onSaveAndAddNew: (any) => void;
  onCancel: () => void;
  saveButtonName: string;
  i18nNamespaces?: ["modalAddEdit"];
  t?: any
}

class ModalAdd extends React.Component<FormSettings, {}> {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
  return (
    <Modal
      show={this.props.show}
      keyboard={true}
      onHide={this.props.onCancel}
      backdrop="static"
      size="lg"
    >
      <Modal.Header closeButton className="backgroundPrimary">
        <Modal.Title>{this.props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{this.props.children}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          type="submit"
          target={this.props.targetForm}
          onClick={this.props.onSaveAndAddNew}
        >
          {this.props.t("saveAndAddNew")}
        </Button>
        <Button
          variant="primary"
          type="submit"
          target={this.props.targetForm}
          onClick={this.props.onSave}
        >
          {this.props.saveButtonName}
        </Button>
        <Button
          variant="outline-danger"
          onClick={this.props.onCancel}
          className="floatLeft"
        >
          {this.props.t("cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
}

export default withTranslation(["modalAddEdit"])(ModalAdd);
