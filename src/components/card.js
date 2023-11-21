import { likeCardServer, dislikeCardServer } from './api';
import { openPopup } from './modal';

//Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

const placeList = document.querySelector('.places__list');
const popupDelete = document.querySelector('.popup_type_delete-card');

const renderCard = (card, position) => {
  if (position === 'down') {
    placeList.append(card);
  } else {
    placeList.prepend(card);
  }
};

export const createCard = (
  cardContent,
  handleCardDelete,
  handleCardLike,
  handleCardImageClick,
  userId
) => {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button');
  const buttonLike = card.querySelector('.card__like-button');

  cardImage.addEventListener('click', handleCardImageClick);
  buttonLike.addEventListener('click', handleCardLike);

  if (cardContent.owner._id !== userId) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener('click', handleCardDelete);
  }

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  card.dataset._id = cardContent._id;
  card.dataset.currentUser = userId;

  // renderCardInfo(card, cardContent);
  renderCardLikes(card, cardContent.likes);

  return card;
};

//Функция создания карточки
export const addCard = (
  cardContent,
  handleCardDelete,
  handleCardLike,
  handleCardImageClick,
  userId,
  position = 'down'
) => {
  renderCard(
    createCard(
      cardContent,
      handleCardDelete,
      handleCardLike,
      handleCardImageClick,
      userId
    ),
    position
  );
};

//handle Функция удаления карточки
export const handleCardDelete = (event) => {
  popupDelete.dataset._id = event.target.closest('.card').dataset._id;
  openPopup(popupDelete);
};

//handle Функция лайка/диздайка карточки
export const handleCardLike = (event) => {
  const buttonLike = event.target;
  const card = buttonLike.closest('.card');
  const cardId = event.target.closest('.card').dataset._id;
  if (!event.target.classList.contains('card__like-button_is-active')) {
    likeCardServer(cardId).then((data) => renderCardLikes(card, data.likes));
  } else {
    dislikeCardServer(cardId).then((data) => renderCardLikes(card, data.likes));
  }
};

const renderCardLikes = (cardElement, cardLikes) => {
  const buttonLike = cardElement.querySelector('.card__like-button');
  const countLikeElement = cardElement.querySelector('.card__like-count');

  //Количество смотрим по всем лайкам
  countLikeElement.textContent = cardLikes.length;
  //стиль устанавливаем только для своего лайка
  if (cardLikes.some((user) => user._id === cardElement.dataset.currentUser)) {
    buttonLike.classList.add('card__like-button_is-active');
  } else {
    buttonLike.classList.remove('card__like-button_is-active');
  }
};

export const deleteCard = (cardId) => {
  const cardList = Array.from(placeList.querySelectorAll('.card'));
  cardList.find((card) => card.dataset._id === cardId).remove();
};
