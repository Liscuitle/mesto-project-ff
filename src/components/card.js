import { toggleLike, deleteCardFromApi } from "./api.js";

export function createCard(cardData, openImageCallback, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.cloneNode(true);
  const cardElement = cardClone.querySelector(".card");

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    deleteButton.remove(); 
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCardFromApi(cardData._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    });
  }

  cardImage.addEventListener("click", () => {
    openImageCallback(cardData);
  });

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    toggleLike(cardData._id, isLiked)
      .then((updatedCard) => {
        likeButton.classList.toggle("card__like-button_is-active", !isLiked);
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  });

  return cardElement;
}
