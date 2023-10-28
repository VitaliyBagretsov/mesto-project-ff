import { openPopup, closePopup } from './components/modal';
import {
  initialCards,
  addCard,
  handleCardDelete,
  handleCardLike,
  handleCardImageClick,
} from './components/cards';
import { fillFormData, getFormData } from './components/form';

import './pages/index.css';

// @todo: DOM узлы
const profileInfo = document.querySelector('.profile__info');
const profileInfoTitle = profileInfo.querySelector('.profile__title');
const profileInfoDescription = profileInfo.querySelector(
  '.profile__description'
);
const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupCardNew = document.querySelector('.popup_type_new-card');

const formProfileEdit = document.forms['edit-profile'];
const formCardNew = document.forms['new-place'];

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

buttonOpenPopupProfile.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  fillFormData(formProfileEdit, {
    name: profileInfoTitle.textContent,
    description: profileInfoDescription.textContent,
  });
});

buttonOpenPopupCardAdd.addEventListener('click', () => {
  openPopup(popupCardNew);
});

buttonsClosePopup.forEach((button) => {
  button.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

// Submit формы новой карточки
formCardNew.addEventListener('submit', (event) => {
  event.preventDefault();
  addCard(
    getFormData(event.target),
    handleCardDelete,
    handleCardLike,
    handleCardImageClick,
    'up'
  );
  fillFormData(event.target, { name: null, link: null });
  closePopup(popupCardNew);
});

// Submit формы профиля
formProfileEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = getFormData(event.target);
  profileInfoTitle.textContent = data.name;
  profileInfoDescription.textContent = data.description;
  closePopup(popupProfileEdit);
});

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  addCard(item, handleCardDelete, handleCardLike, handleCardImageClick)
);
