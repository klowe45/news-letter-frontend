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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSigninSubmit({ email, password });
    resetForm();
  };

  const isSubmitDisabled = email.trim() === "" || password.trim() === "";

  return (
    <ModalWithForm
      closeModal={closeModal}
      isOpen={activeModal === "signin"}
      titleText="Sign in"
      buttonText="Sign in"
      buttonOther="Sign up"
      orText="or"
      toggleModal={handleSignupClick}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="email-signin" className="modal__label">
        Email
      </label>
      <input
        type="email"
        className={`modal__input ${email ? "modal__input-filled" : ""}`}
        id="email-signin"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password-signin" className="modal__label">
        Password
      </label>
      <input
        type="password"
        className={`modal__input ${password ? "modal__input-filled" : ""}`}
        id="password-signin"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default SigninModal;
