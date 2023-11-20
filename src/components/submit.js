import { closePopup } from './modal';
import {
  addCard,
  handleCardDelete,
  handleCardLike,
  handleCardImageClick,
  deleteCard,
} from './cards';
import { getFormData } from './form';
import {
  createCardServer,
  deleteCardServer,
  updateUserProfile,
  updateUserAvatar,
} from './api';
import { renderUserProfileLocal } from './profile';

const toggleLoadStatus = (form) => {
  const buttonForm = form.querySelector('.popup__button');
  if (buttonForm.dataset.loading) {
    buttonForm.textContent = buttonForm.dataset.text;
    delete buttonForm.dataset.loading;
    delete buttonForm.dataset.text;
  } else {
    buttonForm.dataset.loading = true;
    buttonForm.dataset.text = buttonForm.textContent;
    buttonForm.textContent = 'Сохранение...';
  }
};

// Submit формы новой карточки
export const submitCardNew = (event) => {
  event.preventDefault();
  const popup = event.target.closest('.popup');
  toggleLoadStatus(event.target);
  createCardServer(getFormData(event.target))
    .then((data) => {
      addCard(
        data,
        handleCardDelete,
        handleCardLike,
        handleCardImageClick,
        'up'
      );
    })
    .catch((err) => alert(err))
    .finally(() => {
      toggleLoadStatus(event.target);
      closePopup(popup);
      event.target.reset();
    });
};

// submit удаления карточки места
export const submitCardDelete = (event) => {
  event.preventDefault();
  const popup = event.target.closest('.popup');
  deleteCardServer(popup.dataset._id)
    .then(() => {
      deleteCard(popup.dataset._id);
      delete popup.dataset._id;
      closePopup(popup);
    })
    .catch((err) => alert(err));
};

// Submit формы профиля
export const submitProfileEdit = (event) => {
  event.preventDefault();
  const popup = event.target.closest('.popup');
  const data = getFormData(event.target);
  toggleLoadStatus(event.target);
  updateUserProfile('me', data.name, data.description)
    .then((updateData) => {
      renderUserProfileLocal(updateData.name, updateData.about);
    })
    .catch((err) => alert(err))
    .finally(() => {
      toggleLoadStatus(event.target);
      closePopup(popup);
      event.target.reset();
    });
};

// Submit формы аватара
export const submitAvatarEdit = (event) => {
  event.preventDefault();
  const popup = event.target.closest('.popup');
  const data = getFormData(event.target);
  toggleLoadStatus(event.target);
  updateUserAvatar('me', data.link)
    .then((updateData) => {
      renderUserProfileLocal(
        updateData.name,
        updateData.about,
        updateData.avatar
      );
    })
    .catch((err) => alert(err))
    .finally(() => {
      toggleLoadStatus(event.target);
      closePopup(popup);
      event.target.reset();
    });
};
