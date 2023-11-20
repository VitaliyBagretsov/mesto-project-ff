import { openPopup, closePopup } from './components/modal';
import {
  addCard,
  handleCardDelete,
  handleCardLike,
  handleCardImageClick,
} from './components/cards';
import { fillFormData } from './components/form';
import { enableValidation } from './components/validation';
import { getUserProfile, getCardList } from './components/api';
import {
  userProfileStore,
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

// DOM узлы
const buttonOpenPopupCardAdd = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAvatarEdit = document.querySelector('.popup_type_edit-avatar');
const popupCardNew = document.querySelector('.popup_type_new-card');

const formProfileEdit = document.forms['edit-profile'];
const formAvatarEdit = document.forms['edit-avatar'];
const formCardNew = document.forms['new-place'];
const formCardDelete = document.forms['delete-card-place'];

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__image');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

buttonOpenPopupProfile.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  fillFormData(formProfileEdit, getUserProfileLocal());
  enableValidation(formProfileEdit);
});

buttonOpenPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatarEdit);
  enableValidation(formAvatarEdit);
});

buttonOpenPopupCardAdd.addEventListener('click', () => {
  openPopup(popupCardNew);
  enableValidation(formCardNew);
});

buttonsClosePopup.forEach((button) => {
  button.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

// Submit формы новой карточки
formCardNew.addEventListener('submit', submitCardNew);
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
    // Запомнить и заполнить профиль пользователя
    Object.entries(userProfile).forEach(([key, value]) => {
      userProfileStore[key] = value;
    });
    renderUserProfileLocal(
      userProfile.name,
      userProfile.about,
      userProfile.avatar
    );
    // Вывести карточки на страницу
    cardList.forEach((item) => {
      addCard(item, handleCardDelete, handleCardLike, handleCardImageClick);
    });
  }
);
