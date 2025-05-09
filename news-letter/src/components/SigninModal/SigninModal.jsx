import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SigninModal({
  closeModal,
  activeModal,
  handleSignupClick,
  handleSigninSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleOrSignupClick = () => {
    handleSignupClick();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSigninSubmit({ email, password });
    resetForm();
  };

  return (
    <ModalWithForm
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "signin"}
      titleText={"Sign in"}
      buttonText={"Sign in"}
      buttonOther={"Sign up"}
      orText={"or"}
      toggleModal={handleOrSignupClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email-signin" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email-signin"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </label>
      <label htmlFor="password-signin" className="modal__label">
        Password{""}
        <input
          type="password"
          className="modal__input"
          name="password"
          id="password-signin"
          placeholder="Enter passwrod"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default SigninModal;
