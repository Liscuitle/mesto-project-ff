import { openModal, closeModal } from "./modal.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title"); 
const profileJob = document.querySelector(".profile__description"); 

const profileModal = document.querySelector(".popup_type_edit"); 
const profileForm = profileModal.querySelector(".popup__form"); 
const nameInput = profileModal.querySelector(".popup__input_type_name"); 
const jobInput = profileModal.querySelector(".popup__input_type_description");

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileModal);
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
});
