import React from "react";
import styles from "./styles.module.scss";

export default function SideNote({ children, isOpened }) {
  return (
    <>
      <div
        className={isOpened ? styles.containerOpened : styles.containerClosed}
      >
        <div className={styles.icon}>
          {" "}
          <i className="fa fa-arrow-circle-left" />
        </div>
        {children}
      </div>
    </>
  );
}
