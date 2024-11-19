import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
} from "./components/api.js";

function toggleButtonLoadingState(
  button,
  isLoading,
  defaultText,
  loadingText = "Сохранение..."
) {
  button.textContent = isLoading ? loadingText : defaultText;
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const avatarForm = document.forms["update-avatar"];
const avatarModal = document.querySelector(".popup_type_avatar");
const avatarImage = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__avatar-container");
const avatarSubmitButton = avatarForm.querySelector(
  validationConfig.submitButtonSelector
);

avatarEditButton.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarForm.elements["avatar"].value;

  toggleButtonLoadingState(avatarSubmitButton, true, "Сохранить");
  updateAvatar({ avatar: avatarUrl })
    .then((userData) => {
      avatarImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarModal);
      avatarForm.reset();
      clearValidation(avatarForm, validationConfig); 
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() =>
      toggleButtonLoadingState(avatarSubmitButton, false, "Сохранить")
    );
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

const profileForm = document.forms["edit-profile"];
const profileSubmitButton = profileForm.querySelector(
  validationConfig.submitButtonSelector
);
const editProfileButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = profileModal.querySelector(".popup__input_type_name");
const jobInput = profileModal.querySelector(".popup__input_type_description");

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  toggleButtonLoadingState(profileSubmitButton, true, "Сохранить");
  updateUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profileModal);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() =>
      toggleButtonLoadingState(profileSubmitButton, false, "Сохранить")
    );
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

const newPlaceForm = document.forms["new-place"];
const newPlaceSubmitButton = newPlaceForm.querySelector(
  validationConfig.submitButtonSelector
);
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector(".popup_type_new-card");
const placesList = document.querySelector(".places__list");

addCardButton.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  openModal(addCardModal);
});

function handleNewPlaceSubmit(evt) {
  evt.preventDefault();
  const placeData = {
    name: newPlaceForm.elements["place-name"].value,
    link: newPlaceForm.elements["link"].value,
  };

  toggleButtonLoadingState(newPlaceSubmitButton, true, "Создать");
  addNewCard(placeData)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        openImageModal,
        newCard.owner._id
      );
      placesList.prepend(cardElement);
      closeModal(addCardModal);
      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationConfig); 
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() =>
      toggleButtonLoadingState(newPlaceSubmitButton, false, "Создать")
    );
}

newPlaceForm.addEventListener("submit", handleNewPlaceSubmit);

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;

    renderCards(cards, placesList, openImageModal, userId);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));


enableValidation(validationConfig);

function renderCards(cards, container, openImageCallback, userId) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, openImageCallback, userId);
    container.appendChild(cardElement);
  });
}

function openImageModal(cardData) {
  const modalImage = document.querySelector(".popup_type_image .popup__image");
  const modalCaption = document.querySelector(
    ".popup_type_image .popup__caption"
  );
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openModal(document.querySelector(".popup_type_image"));
}
