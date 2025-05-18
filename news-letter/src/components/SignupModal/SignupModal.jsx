import { React, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/useForm";

function SignupModal({
  activeModal,
  closeModal,
  handleSigninClick,
  handleSignupSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleOrSigninClick = () => {
    handleSigninClick();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignupSubmit({ email, password, username });
    resetForm();
  };

  const isSubmitDisabled = email.trim() === "" || password.trim() === "";

  return (
    <ModalWithForm
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "signup"}
      titleText={"Sign up"}
      buttonText={"Sign up"}
      buttonOther={"Sign in"}
      orText={"or"}
      onSubmit={handleSubmit}
      toggleModal={handleOrSigninClick}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="email-signup" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email-signup"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default SignupModal;
