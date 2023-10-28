import { openPopup } from './modal';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content;

const placeList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
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

  return card;
};

// @todo: Функция создания карточки
export const addCard = (
  cardContent,
  handleCardDelete,
  handleCardLike,
  handleCardImageClick,
  position = 'down'
) => {
  renderCard(
    createCard(cardContent, handleCardDelete, handleCardLike, handleCardImageClick),
    position
  );
};

// @todo: Функция удаления карточки
export const handleCardDelete = (event) => {
  event.target.closest('.card').remove();
};

// @todo: Функция лайка карточки
export const handleCardLike = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
};

// @todo: Функция детализации карточки
export const handleCardImageClick = (event) => {
  popupImageCard.src = event.target.src;
  popupImageCard.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openPopup(popupImage);
};
