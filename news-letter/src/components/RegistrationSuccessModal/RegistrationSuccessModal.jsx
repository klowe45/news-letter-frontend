import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegistrationSuccessModal({ closeModal, activeModal }) {
  return (
    <ModalWithForm
      closeModal={closeModal}
      activeModal={activeModal}
      buttonOther={"Sign in"}
      isOpen={activeModal === "signupSuccess"}
      titleText={"Registration successfully completed!"}
      hiddenSubmitButton={true}
    ></ModalWithForm>
  );
}

export default RegistrationSuccessModal;
