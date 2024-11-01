export function openModal(popup) {
  document.addEventListener("keydown", closeByEscape);
  popup.classList.add("popup_is-opened");
}

export function closeModal(popup) {
  document.removeEventListener("keydown", closeByEscape);
  popup.classList.remove("popup_is-opened");
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
