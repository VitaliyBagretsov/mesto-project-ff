const groupId = 'wff-cohort-1';

const config = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: 'dcb429c9-2d54-4302-8b0d-6aea9121fbd8',
    'Content-Type': 'application/json',
  },
};

const resolve = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw `${res.status}: ${res.statusText}`;
  }
};

export const getUserProfile = (userId) => {
  return fetch(`${config.baseUrl}/users/${userId}`, {
    headers: config.headers,
  }).then(resolve);
};

export const updateUserProfile = (userId, name, about) => {
  return fetch(`${config.baseUrl}/users/${userId}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(resolve);
};

export const updateUserAvatar = (userId, avatar) => {
  return fetch(`${config.baseUrl}/users/${userId}/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(resolve);
};

export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(resolve);
};

export const createCardServer = (content) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: content.name,
      link: content.link,
    }),
  }).then(resolve);
};

export const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

export const likeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(resolve);
};

export const dislikeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(resolve);
};
