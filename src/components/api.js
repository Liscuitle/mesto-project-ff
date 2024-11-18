const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "21619cee-3e84-4dd9-a987-5c5b5567cac7",
    "Content-Type": "application/json",
  },
};


function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`); 
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function updateUserInfo(data) {
  console.log("Отправка данных на сервер:", data);
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function addNewCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function toggleLike(cardId, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  }).then(checkResponse);
}

export function deleteCardFromApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function updateAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}
