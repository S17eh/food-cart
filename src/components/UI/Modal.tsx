import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

export interface InputWrapperProps {
  children?: JSX.Element | JSX.Element[];
  onClose?: React.MouseEventHandler<HTMLElement>;
}

const Backdrop = (props: {
  onClose?: React.MouseEventHandler<HTMLElement>;
}) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props: InputWrapperProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const overlayId = document.getElementById("modal") as HTMLElement;

const Modal = (props: InputWrapperProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, overlayId)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayId
      )}
    </>
  );
};

export default Modal;
