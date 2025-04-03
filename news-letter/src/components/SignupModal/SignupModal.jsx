import { React, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/useForm";

function SignupModal({
  activeModal,
  closeModal,
  handleSignupSubmit,
  handleSigninClick,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    username: "",
  });

  const handleResetInputs = () => {
    setValues({
      email: "",
      password: "",
      username: "",
    });
  };

  useEffect(() => {
    setValues({
      email: "",
      password: "",
      username: "",
    });
  }, [activeModal, setValues]);

  const onSignup = (e) => {
    e.preventDefault();
    handleSignupSubmit(values);
    console.log("submitted");
  };

  const handleOrSigninClick = () => {
    handleSigninClick();
  };

  return (
    <ModalWithForm
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "signup"}
      titleText={"Sign up"}
      buttonText={"Sign up"}
      buttonOther={"Sign in"}
      orText={"or"}
      hiddenSubmitButton={false}
      onSubmit={onSignup}
      toggleModal={handleOrSigninClick}
    >
      <label htmlFor="email-signup" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email-signup"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
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
          value={values.username}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default SignupModal;
