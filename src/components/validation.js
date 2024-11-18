function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    // Слушаем все изменения в форме
    form.addEventListener("input", (event) => {
      handleFormInput(event, form, config);
    });

    // Устанавливаем начальное состояние кнопки для каждой формы
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

  // Проверяем, можно ли активировать кнопку
  setButtonState(form, config);
}

function setButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity(); // Проверяем всю форму на валидность
  button.disabled = !isValid; // Если форма невалидна, кнопка неактивна
  button.classList.toggle(config.inactiveButtonClass, !isValid); // Включаем/выключаем стиль неактивной кнопки
}

function showInputError(input, config) {
  const errorElement = input.nextElementSibling;
  const customMessage = input.getAttribute("data-error-message");

  // Устанавливаем кастомное сообщение об ошибке, если оно задано
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
  setButtonState(form, config); // Проверяем, можно ли активировать кнопку после очистки ошибок
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
