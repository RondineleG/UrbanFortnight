import React, { useEffect, useRef, useState } from "react";
import { Form, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import MaskedInput from "react-text-mask";
import Label from "../Label";
import styles from "./styles.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function DefaultInput(props) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [copy, setCopy] = useState(false);
  const [showCopyLabel, setShow] = useState(false);
  const target = useRef(null);

  const handleChange = (e: string) => {
    setCount(e.length);
  };

  const handleClick = () => {
    setShow(true);
    console.log(showCopyLabel);
    setTimeout(() => {
      setShow(false);
      console.log(showCopyLabel);
    }, 1000);
  };

  return props.tableCase ? (
    <FormControl
      as={props.mask != null || props.pipe != null ? MaskedInput : FormControl}
      type={props.dateType ? "text" : props.type}
      onFocus={
        props.dateType
          ? (e) => {
              e.currentTarget.type = "date";
              e.currentTarget.focus();
            }
          : props.onFocus
      }
      className={`${styles.default} ${
        props.type === "color" && styles.typeColor
      }`}
      {...props}
    />
  ) : props.tooltip ? (
    <OverlayTrigger
      key={props.tooltipPlace}
      placement={props.tooltipPlace}
      overlay={
        <Tooltip
          className={styles.tooltip}
          id={`tooltip-${props.tooltipPlace}`}
        >
          {props.tooltip}
        </Tooltip>
      }
    >
      <Form.Group controlId={props.controlId} onChange={props.onValueChange}>
        <Label>{props.label}</Label>
        <FormControl
          as={
            props.mask != null || props.pipe != null ? MaskedInput : FormControl
          }
          type={props.dateType ? "text" : props.type}
          onChange={(e) => {
            handleChange(e.target.value);
            setValue(e.target.value);
          }}
          onFocus={
            props.dateType
              ? (e) => {
                  e.currentTarget.type = "date";
                  e.currentTarget.focus();
                }
              : props.onFocus
          }
          className={`${styles.default} ${
            props.type === "color" && styles.typeColor
          } ${props.hasWarning && styles.warningInput}`}
          {...props}
        />
        {props.hasCounter && (
          <div className={styles.counter}>
            {props.maxCount != null ? props.maxCount - count : count}
          </div>
        )}
        {props.hasCopyToClipboard && (
          <div className={styles.copyClipboard}>
            <Overlay
              target={target.current}
              show={showCopyLabel}
              placement="right"
            >
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  Copiado!
                </Tooltip>
              )}
            </Overlay>
            <CopyToClipboard
              text={value}
              onCopy={() => {
                setCopy(true);
              }}
            >
              <i className="far fa-copy" ref={target} onClick={handleClick} />
            </CopyToClipboard>
          </div>
        )}
        {props.validMessage != null && (
          <Form.Control.Feedback type="valid">
            {props.validMessage}
          </Form.Control.Feedback>
        )}
        {props.invalidMessage != null && (
          <Form.Control.Feedback type="invalid">
            {props.invalidMessage}
          </Form.Control.Feedback>
        )}
        {props.hasWarning != null && (
          <Form.Control.Feedback className={styles.warning} type="valid">
            {props.warningMessage}
          </Form.Control.Feedback>
        )}
        {props.message != null && (
          <Form.Text className={`text-muted ${styles.bottomText}`}>
            {props.message}
          </Form.Text>
        )}
      </Form.Group>
    </OverlayTrigger>
  ) : (
    <Form.Group controlId={props.controlId} onChange={props.onValueChange}>
      <Label>{props.label}</Label>
      <FormControl
        as={
          props.mask != null || props.pipe != null ? MaskedInput : FormControl
        }
        type={props.dateType ? "text" : props.type}
        onChange={(e) => {
          handleChange(e.target.value);
          setValue(e.target.value);
        }}
        onFocus={
          props.dateType
            ? (e) => {
                e.currentTarget.type = "date";
                e.currentTarget.focus();
              }
            : props.onFocus
        }
        className={`${styles.default} ${
          props.type === "color" && styles.typeColor
        } ${props.hasWarning && styles.warningInput}`}
        {...props}
      />
      {props.hasCounter && (
        <div className={styles.counter}>
          {props.maxCount != null ? props.maxCount - count : count}
        </div>
      )}
      {props.hasCopyToClipboard && (
        <div className={styles.copyClipboard}>
          <Overlay
            target={target.current}
            show={showCopyLabel}
            placement="right"
          >
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Copiado!
              </Tooltip>
            )}
          </Overlay>
          <CopyToClipboard
            text={value}
            onCopy={() => {
              setCopy(true);
            }}
          >
            <i className="far fa-copy" ref={target} onClick={handleClick} />
          </CopyToClipboard>
        </div>
      )}
      {props.validMessage != null && (
        <Form.Control.Feedback type="valid">
          {props.validMessage}
        </Form.Control.Feedback>
      )}
      {props.invalidMessage != null && (
        <Form.Control.Feedback type="invalid">
          {props.invalidMessage}
        </Form.Control.Feedback>
      )}
      {props.hasWarning != null && (
        <Form.Control.Feedback className={styles.warning} type="valid">
          {props.warningMessage}
        </Form.Control.Feedback>
      )}
      {props.message != null && (
        <Form.Text className={`text-muted ${styles.bottomText}`}>
          {props.message}
        </Form.Text>
      )}
    </Form.Group>
  );
}
