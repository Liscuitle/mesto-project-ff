import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { renderCards, createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { openImageModal } from "./components/imagePopup.js";

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button"); 
const addCardModal = document.querySelector(".popup_type_new-card");
const profileModal = document.querySelector(".popup_type_edit"); 
const imageModal = document.querySelector(".popup_type_image");
const closeImageModalButton = imageModal.querySelector(".popup__close");
const placesList = document.querySelector(".places__list");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = profileModal.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");

closeImageModalButton.addEventListener("click", () => closeModal(imageModal));

addCardButton.addEventListener("click", () => openModal(addCardModal));

editProfileButton.addEventListener("click", () => {

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  
  openModal(profileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(profileModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

const addCardForm = addCardModal.querySelector(".popup__form");
addCardForm.addEventListener("submit", handleAddCardSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const nameInput = addCardForm.querySelector(".popup__input_type_card-name");
  const linkInput = addCardForm.querySelector(".popup__input_type_url");

  const newCard = createCard(
    { name: nameInput.value, link: linkInput.value },
    openImageModal
  );

  placesList.prepend(newCard);

  closeModal(addCardModal);
  addCardForm.reset();
}

renderCards(initialCards, placesList, openImageModal);
