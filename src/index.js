import { openPopup, closePopup } from './components/modal';
import {
  initialCards,
  addCard,
  deleteCard,
  likeCard,
  detailCard,
} from './components/cards';
import { initialOpenForm, getFormData } from './components/form';

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

buttonOpenPopupProfile.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  initialOpenForm(formProfileEdit, {
    name: profileInfoTitle.textContent,
    description: profileInfoDescription.textContent,
  });
});

buttonOpenPopupCardAdd.addEventListener('click', () => {
  openPopup(popupCardNew);
});

// Submit формы новой карточки
formCardNew.addEventListener('submit', (event) => {
  event.preventDefault();
  addCard(getFormData(event.target), deleteCard, likeCard, detailCard, 'up');
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
initialCards.forEach((item) => addCard(item, deleteCard, likeCard, detailCard));
