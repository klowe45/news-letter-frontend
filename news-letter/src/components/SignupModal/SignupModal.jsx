import { React, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignupModal({ activeModal, closeModal }) {
  return (
    <ModalWithForm
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "signup"}
      titleText={"Sign up"}
      buttonText={"Sign up"}
      buttonOther={"Sign in"}
      orText={"or"}
    >
      <label htmlFor="email-signup" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email-signup"
          placeholder="Enter email"
        ></input>
      </label>
      <label htmlFor="password-signup" className="modal__label">
        Password{""}
        <input
          type="password"
          className="modal__input"
          name="password"
          id="password-signup"
          placeholder="Enter passwrod"
        ></input>
      </label>
      <label htmlFor="username-signup" className="modal__label">
        Username{""}
        <input
          type="text"
          className="modal__input"
          name="username"
          id="username-signup"
          placeholder="Enter username"
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default SignupModal;
