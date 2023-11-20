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

export const getUserProfile = async (userId) => {
  return fetch(`${config.baseUrl}/users/${userId}`, {
    headers: config.headers,
  })
    .then(resolve)
    .catch((err) => alert(err));
};

export const updateUserProfile = async (userId, name, about) => {
  return fetch(`${config.baseUrl}/users/${userId}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then(resolve)
    .catch((err) => alert(err));
};

export const updateUserAvatar = async (userId, avatar) => {
  return fetch(`${config.baseUrl}/users/${userId}/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  })
    .then(resolve)
    .catch((err) => alert(err));
};

export const getCardList = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(resolve)
    .catch((err) => alert(err));
};

export const createCardServer = (content) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: content.name,
      link: content.link,
    }),
  })
    .then(resolve)
    .catch((err) => alert(err));
};

export const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).catch((err) => alert(err));
};

export const likeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(resolve)
    .catch((err) => alert(err));
};

export const dislikeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(resolve)
    .catch((err) => alert(err));
};
