import { getUserProfile } from './api';

export const userProfileStore = {};

// DOM-элементы профиля
const profileImage = document.querySelector('.profile__image');
const profileInfo = document.querySelector('.profile__info');
const profileInfoTitle = profileInfo.querySelector('.profile__title');
const profileInfoDescription = profileInfo.querySelector(
  '.profile__description'
);

export const fillProfile = () => {
  getUserProfile('me').then((data) => {
    renderUserProfileLocal(data.name, data.about, data.avatar);
  });
};

export const renderUserProfileLocal = (name, about, avatar) => {
  if (name) profileInfoTitle.textContent = name;
  if (about) profileInfoDescription.textContent = about;
  if (avatar) profileImage.style.backgroundImage = `url(${avatar})`;
};

export const getUserProfileLocal = () => {
  return {
    name: profileInfoTitle.textContent,
    description: profileInfoDescription.textContent,
    avatar: profileImage.style.backgroundImage,
  };
};
