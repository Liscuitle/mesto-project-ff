import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardModal = document.querySelector(".popup_type_new-card");
const profileModal = document.querySelector(".popup_type_edit");
const imageModal = document.querySelector(".popup_type_image");
const placesList = document.querySelector(".places__list");

const addCardForm = addCardModal.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

const profileForm = profileModal.querySelector(".popup__form");
const nameInput = profileModal.querySelector(".popup__input_type_name");
const jobInput = profileModal.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function renderCards(cards, container, openImageCallback) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, openImageCallback);
    container.appendChild(cardElement);
  });
}

renderCards(initialCards, placesList, openImageModal);

addCardButton.addEventListener("click", () => openModal(addCardModal));

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    deleteCard,
    openImageModal
  );
  placesList.prepend(newCard);
  closeModal(addCardModal);
  addCardForm.reset();
}

addCardForm.addEventListener("submit", handleAddCardSubmit);

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

function openImageModal(cardData) {
  const modalImage = imageModal.querySelector(".popup__image");
  const modalCaption = imageModal.querySelector(".popup__caption");
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openModal(imageModal);
}

const closeImageModalButton = imageModal.querySelector(".popup__close");
closeImageModalButton.addEventListener("click", () => closeModal(imageModal));
