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

  const handleOrSignupClick = () => {
    handleSignupClick();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSigninSubmit({ email, password });
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
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default SigninModal;
