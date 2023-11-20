import { userProfileStore } from './profile';
import { likeCardServer, dislikeCardServer } from './api';
import { openPopup } from './modal';

//Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

const placeList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popupDelete = document.querySelector('.popup_type_delete-card');
const popupImageCard = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

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
  handleCardImageClick
) => {
  const card = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button');
  const buttonLike = card.querySelector('.card__like-button');

  cardImage.addEventListener('click', handleCardImageClick);
  buttonDelete.addEventListener('click', handleCardDelete);
  buttonLike.addEventListener('click', handleCardLike);

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  card.dataset._id = cardContent._id;

  renderCardInfo(card, cardContent);

  return card;
};

//Функция создания карточки
export const addCard = (
  cardContent,
  handleCardDelete,
  handleCardLike,
  handleCardImageClick,
  position = 'down'
) => {
  renderCard(
    createCard(
      cardContent,
      handleCardDelete,
      handleCardLike,
      handleCardImageClick
    ),
    position
  );
};

//handle Функция удаления карточки
export const handleCardDelete = (event) => {
  // event.target.closest('.card').remove();
  popupDelete.dataset._id = event.target.closest('.card').dataset._id;
  openPopup(popupDelete);
};

//handle Функция лайка/диздайка карточки
export const handleCardLike = (event) => {
  const buttonLike = event.target;
  const card = buttonLike.closest('.card');
  const cardId = event.target.closest('.card').dataset._id;
  if (!event.target.classList.contains('card__like-button_is-active')) {
    likeCardServer(cardId).then((data) => renderCardInfo(card, data));
  } else {
    dislikeCardServer(cardId).then((data) => renderCardInfo(card, data));
  }
};

//handle Функция детализации карточки
export const handleCardImageClick = (event) => {
  popupImageCard.src = event.target.src;
  popupImageCard.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openPopup(popupImage);
};

const renderCardInfo = (cardElement, cardContent) => {
  const userId = userProfileStore._id;
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const countLikeElement = cardElement.querySelector('.card__like-count');
  const cardLikes = cardContent.likes ?? [];

  //Количество смотрим по всем лайкам
  countLikeElement.textContent = cardLikes.length;
  //стиль устанавливаем только для своего лайка
  if (cardLikes.filter((user) => user._id === userId).length > 0) {
    buttonLike.classList.add('card__like-button_is-active');
  } else {
    buttonLike.classList.remove('card__like-button_is-active');
  }

  //Удаляется кнопка удаления чужих картинок
  if (cardContent.owner._id !== userId && buttonDelete) {
    buttonDelete.remove();
  }
};

export const deleteCard = (cardId) => {
  const cardList = Array.from(placeList.querySelectorAll('.card'));
  cardList.forEach((card) => {
    if (card.dataset._id === cardId) {
      card.remove();
    }
  });
};
