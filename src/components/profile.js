import { getUserProfile } from './api';

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

export const renderUserProfileLocal = (userInfo) => {
  if (userInfo.name) profileInfoTitle.textContent = userInfo.name;
  if (userInfo.about) profileInfoDescription.textContent = userInfo.about;
  if (userInfo.avatar) profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

export const getUserProfileLocal = () => {
  return {
    name: profileInfoTitle.textContent,
    description: profileInfoDescription.textContent,
    avatar: profileImage.style.backgroundImage,
  };
};
