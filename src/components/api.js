const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "21619cee-3e84-4dd9-a987-5c5b5567cac7",
    "Content-Type": "application/json",
  },
};

// Проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`); // Исправлено: добавлены кавычки для шаблонной строки
}

// Получение информации о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Получение карточек
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Обновление профиля
export function updateUserInfo(data) {
  console.log("Отправка данных на сервер:", data);
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

// Добавление новой карточки
export function addNewCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

// Лайк/дизлайк карточки
export function toggleLike(cardId, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  }).then(checkResponse);
}

// Удаление карточки
export function deleteCardFromApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

// Обновление аватара
export function updateAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
