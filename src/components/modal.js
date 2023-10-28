let popupOpen; //помним открытый popup

//Закрываем popup по клику внещней области popup
const clickHandler = (event) => {
    if(event.target.classList.contains('popup')) closePopup(popupOpen)
};

//Закрываем popup по Esc
const keydownHandler = (event) => {
    if(event.key === 'Escape') closePopup(popupOpen)
}

export const openPopup = (popup) => {
  popupOpen = popup  
  popup.classList.add("popup_is-opened");
  const buttonPopupClose = popup.querySelector('.popup__close')
  
  buttonPopupClose.addEventListener('click', () => {
    closePopup(popup);
  });
  popup.addEventListener('click', clickHandler);
  document.addEventListener('keydown', keydownHandler);
};

export const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  
  popup.removeEventListener('click', clickHandler);
  document.removeEventListener('keydown', keydownHandler);
  popupOpen = undefined
};
