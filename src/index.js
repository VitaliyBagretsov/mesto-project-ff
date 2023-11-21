import { openPopup, closePopup } from './components/modal';
import { addCard, handleCardDelete, handleCardLike } from './components/card';
import { fillFormData } from './components/form';
import { clearValidation, enableValidation } from './components/validation';
import { getUserProfile, getCardList } from './components/api';
import {
  getUserProfileLocal,
  renderUserProfileLocal,
} from './components/profile';
import {
  submitCardNew,
  submitCardDelete,
  submitProfileEdit,
  submitAvatarEdit,
} from './components/submit';
import './pages/index.css';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// DOM узлы
const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAvatarEdit = document.querySelector('.popup_type_edit-avatar');
const popupCardNew = document.querySelector('.popup_type_new-card');

const formProfileEdit = document.forms['edit-profile'];
const formAvatarEdit = document.forms['edit-avatar'];
const formCardNew = document.forms['new-place'];
const formCardDelete = document.forms['delete-card-place'];

const popupImage = document.querySelector('.popup_type_image');
const popupImageCard = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__image');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

buttonOpenPopupProfile.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  fillFormData(formProfileEdit, getUserProfileLocal());
  clearValidation(formProfileEdit, validationConfig);
});

buttonOpenPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatarEdit);
  formAvatarEdit.reset();
  clearValidation(formAvatarEdit, validationConfig);
});

buttonOpenPopupCardAdd.addEventListener('click', () => {
  openPopup(popupCardNew);
  formCardNew.reset();
  clearValidation(formCardNew, validationConfig);
});

buttonsClosePopup.forEach((button) => {
  button.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

//handle Функция открытия карточки
const handleCardImageClick = (event) => {
  popupImageCard.src = event.target.src;
  popupImageCard.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openPopup(popupImage);
};

// Submit формы новой карточки
//(callback усложненн, чтобы не делать export функции в нисходящий модуль)
formCardNew.addEventListener('submit', (event) => {
  submitCardNew(event, handleCardImageClick);
});
// submit удаления карточки места
formCardDelete.addEventListener('submit', submitCardDelete);
// Submit формы профиля
formProfileEdit.addEventListener('submit', submitProfileEdit);
// Submit формы аватрки
formAvatarEdit.addEventListener('submit', submitAvatarEdit);

const userProfilePromise = getUserProfile('me');
const cardListPromise = getCardList();

Promise.all([userProfilePromise, cardListPromise]).then(
  ([userProfile, cardList]) => {
    renderUserProfileLocal({
      name: userProfile.name,
      about: userProfile.about,
      avatar: userProfile.avatar,
    });
    // Вывести карточки на страницу
    cardList.forEach((item) => {
      addCard(
        item,
        handleCardDelete,
        handleCardLike,
        handleCardImageClick,
        userProfile._id
      );
    });
  }
);

enableValidation(validationConfig);
