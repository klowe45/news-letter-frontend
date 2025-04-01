import "./ModalWithForm.css";

function ModalWithForm({
  closeModal,
  children,
  titleText,
  isOpen,
  onSubmit,
  buttonText,
  buttonOther,
}) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content">
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{titleText}</h2>
          <button
            className="modal__close"
            onClick={closeModal}
            type="button"
          ></button>
          {children}
          <div className="modal__buttons">
            <button className="modal__button-submit">{buttonText}</button>
            <div className="modal__other-button">
              <p className="modal__or-text">or</p>
              <button className="modal__button-other">{buttonOther}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
