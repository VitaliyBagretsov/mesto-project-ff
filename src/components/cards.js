import { openPopup } from "./modal";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

const placeList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const popupImageCard = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const renderCard = (card, position) => {
  if (position === "down") {
    placeList.append(card);
  } else {
    placeList.prepend(card);
  }
};

export const createCard = (cardContent, deleteCard, likeCard, detailCard) => {
  const card = templateCard.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const buttonDelete = card.querySelector(".card__delete-button");
  const buttonLike = card.querySelector(".card__like-button");

  cardImage.addEventListener("click", detailCard);
  buttonDelete.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", likeCard);

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  return card;
};

// @todo: Функция создания карточки
export const addCard = (cardContent, deleteCard, likeCard, detailCard, position = "down") => {
  renderCard(createCard(cardContent, deleteCard, likeCard, detailCard), position);
};

// @todo: Функция удаления карточки
export const deleteCard = (event) => {
  event.target.parentElement.remove();
};

// @todo: Функция лайка карточки
export const likeCard =(event) => {
  event.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция детализации карточки
export const detailCard =(event) => {
  popupImageCard.src = event.target.src;
  popupImageCard.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openPopup(popupImage);
}
