import { closePopup } from './modal';
import {
  addCard,
  handleCardDelete,
  handleCardLike,
  // handleCardImageClick,
  deleteCard,
} from './card';
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
export const submitCardNew = (event, handleCardImageClick) => {
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
        data.owner._id,
        'up'
      );
      closePopup(popup);
      event.target.reset();
    })
    .catch((err) => alert(err))
    .finally(() => {
      toggleLoadStatus(event.target);
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
      renderUserProfileLocal({
        name: updateData.name,
        about: updateData.about,
      });
      closePopup(popup);
      event.target.reset();
    })
    .catch((err) => alert(err))
    .finally(() => {
      toggleLoadStatus(event.target);
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
      renderUserProfileLocal({
        name: updateData.name,
        about: updateData.about,
        avatar: updateData.avatar,
      });
      closePopup(popup);
      event.target.reset();
    })
    .catch((err) => alert(err))
    .finally(() => {
      toggleLoadStatus(event.target);
    });
};
