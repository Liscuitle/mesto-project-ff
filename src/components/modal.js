// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

// Функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Закрытие модального окна по клавише Escape
function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
}

// Закрытие модального окна при клике на крестик или оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (
      event.target.classList.contains("popup_is-opened") || // клик по фону
      event.target.classList.contains("popup__close") // клик по крестику
    ) {
      closeModal(popup);
    }
  });
});
