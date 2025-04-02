import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SigninModal({ closeModal, activeModal }) {
  return (
    <ModalWithForm
      activeModal={activeModal}
      closeModal={closeModal}
      isOpen={activeModal === "signin"}
      titleText={"Sign in"}
      buttonText={"Sign in"}
      buttonOther={"Sign up"}
      orText={"or"}
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
