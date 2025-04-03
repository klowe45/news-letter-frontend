import "./ModalWithForm.css";

function ModalWithForm({
  closeModal,
  children,
  titleText,
  isOpen,
  onSubmit,
  buttonText,
  buttonOther,
  orText,
  hiddenSubmitButton = false,
  toggleModal,
}) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={closeModal}
          type="button"
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{titleText}</h2>
          {children}
          <div className="modal__buttons">
            {!hiddenSubmitButton && (
              <button className="modal__button-submit" type="submit">
                {buttonText}
              </button>
            )}
            <div
              className={`modal__other-button ${
                hiddenSubmitButton ? "modal__other-button-left" : ""
              }`}
            >
              <p className="modal__or-text">{orText}</p>
              <button
                type="button"
                className="modal__button-other"
                onClick={toggleModal}
              >
                {buttonOther}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
