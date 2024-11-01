export function deleteCard(cardElement) {
  cardElement.remove();
}

export function createCard(cardData, deleteCardCallback, openImageCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.cloneNode(true);
  const cardElement = cardClone.querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCardCallback(cardElement);
  });

  cardImage.addEventListener("click", () => {
    openImageCallback(cardData);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  return cardElement;
}

export function renderCards(cards, container, openImageCallback) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, openImageCallback);
    container.appendChild(cardElement);
  });
}
