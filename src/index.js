import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./components/validation.js";
import {
  getUserInfo,
  getCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
} from "./components/api.js";

// Функция для переключения состояния кнопки
function toggleButtonLoadingState(
  button,
  isLoading,
  defaultText,
  loadingText = "Сохранение..."
) {
  button.textContent = isLoading ? loadingText : defaultText;
}

// Элементы и формы
const avatarForm = document.forms["update-avatar"];
const avatarModal = document.querySelector(".popup_type_avatar");
const avatarImage = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__avatar-container");
const avatarSubmitButton = avatarForm.querySelector(".popup__button");

// Открытие формы обновления аватара
avatarEditButton.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

// Обработчик формы обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarForm.elements["avatar"].value;

  toggleButtonLoadingState(avatarSubmitButton, true, "Сохранить");
  updateAvatar({ avatar: avatarUrl })
    .then((userData) => {
      avatarImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() =>
      toggleButtonLoadingState(avatarSubmitButton, false, "Сохранить")
    );
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Формы и элементы
const profileForm = document.forms["edit-profile"];
const profileSubmitButton = profileForm.querySelector(".popup__button");
const newPlaceForm = document.forms["new-place"];
const newPlaceSubmitButton = newPlaceForm.querySelector(".popup__button");

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardModal = document.querySelector(".popup_type_new-card");
const profileModal = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = profileModal.querySelector(".popup__input_type_name");
const jobInput = profileModal.querySelector(".popup__input_type_description");

const placesList = document.querySelector(".places__list");

// Рендеринг карточек
function renderCards(cards, container, openImageCallback, userId) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, openImageCallback, userId);
    container.appendChild(cardElement);
  });
}

// Открытие модального окна изображения
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

// Обработчик формы профиля
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

// Обработчик формы добавления новой карточки
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

// Открытие модальных окон
addCardButton.addEventListener("click", () => {
  clearValidation(newPlaceForm, validationConfig);
  openModal(addCardModal);
});

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileModal);
});

// Загрузка данных профиля и карточек
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;

    renderCards(cards, placesList, openImageModal, userId);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

// Включение валидации
enableValidation(validationConfig);

// Добавление обработчиков на формы
profileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleNewPlaceSubmit);
