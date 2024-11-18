function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {

    form.addEventListener("input", (event) => {
      handleFormInput(event, form, config);
    });

    
    setButtonState(form, config);
  });
}

function handleFormInput(event, form, config) {
  const input = event.target;
  if (!input.validity.valid) {
    showInputError(input, config);
  } else {
    hideInputError(input, config);
  }

  
  setButtonState(form, config);
}

function setButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity(); 
  button.disabled = !isValid; 
  button.classList.toggle(config.inactiveButtonClass, !isValid); 
}

function showInputError(input, config) {
  const errorElement = input.nextElementSibling;
  const customMessage = input.getAttribute("data-error-message");

  
  errorElement.textContent =
    customMessage && input.validity.patternMismatch
      ? customMessage
      : input.validationMessage;

  errorElement.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
}

function hideInputError(input, config) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
}

function clearValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => hideInputError(input, config));
  setButtonState(form, config); 
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export { enableValidation, clearValidation, validationConfig };
