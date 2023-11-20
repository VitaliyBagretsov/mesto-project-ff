import {
  enableValidation,
  clearValidation,
} from './validation';

let popupOpen; //помним открытый popup

//Закрываем popup по клику внещней области popup
const handleOverlay = (event) => {
  if (event.target.classList.contains('popup')) closePopup(popupOpen);
};

//Закрываем popup по Esc
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') closePopup(popupOpen);
};

export const openPopup = (popup) => {
  popupOpen = popup;
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handleOverlay);
  document.addEventListener('keydown', handleEscapeKey);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');

  popup.removeEventListener('click', handleOverlay);
  document.removeEventListener('keydown', handleEscapeKey);
  const form = popup.querySelector('.popup__form');
  if (form) clearValidation(form); //отключение listener и валидации при закрытии формы

  popupOpen = undefined;
};
