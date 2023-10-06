// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const profileInfo = document.querySelector(".profile__info");
const profileInfoTitle = profileInfo.querySelector(".profile__title")
const profileInfoDescription = profileInfo.querySelector(".profile__description")
const buttonOpenPopupCardAdd = document.querySelector(".profile__add-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupCardNew = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupImageCard = popupImage.querySelector(".popup__image");

const formCardNew = popupCardNew.querySelector(".popup__form");
const formProfileEdit = popupProfileEdit.querySelector(".popup__form");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonsClosePopup = document.querySelectorAll(".popup__close");

const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
};

const createCard = (cardContent, deleteCard) => {
  const card = templateCard.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const buttonDelete = card.querySelector(".card__delete-button");
  const buttonLike = card.querySelector(".card__like-button");

  cardImage.addEventListener("click", () => {
    popupImageCard.src = cardContent.link;
    popupImageCard.alt = cardContent.name;
    openPopup(popupImage);
  });

  buttonDelete.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", (event) => {
    event.target.classList.toggle("card__like-button_is-active");
  });

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;

  return card;
};

const renderCard = (card, position) => {
  if (position === "down") {
    placeList.append(card);
  } else {
    placeList.prepend(card);
  }
};

// @todo: Функция создания карточки
const addCard = (cardContent, deleteCard, position = "down") => {
  renderCard(createCard(cardContent, deleteCard), position);
};

// @todo: Функция удаления карточки
const deleteCard = (event) => {
  event.target.parentElement.remove();
};

buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(popupProfileEdit);
});

buttonOpenPopupCardAdd.addEventListener("click", () => {
  openPopup(popupCardNew);
});

buttonsClosePopup.forEach((button) => {
  button.addEventListener("click", (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

// Submit формы новой карточки
formCardNew.onsubmit = (event) => {
  event.preventDefault();
  const { elements } = event.target;

  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;
      return { name, value };
    })
    .reduce((prev, curr) => {
      const result = { ...prev };
      result[curr.name.replace("place-", "")] = curr.value;
      return result;
    }, {});
  addCard(data, deleteCard, "up");
  closePopup(popupCardNew);
};

// Submit формы профиля
formProfileEdit.onsubmit = (event) => {
  event.preventDefault();
  const { elements } = event.target;

  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;
      return { name, value };
    })
    .reduce((prev, curr) => {
      const result = { ...prev };
      result[curr.name] = curr.value;
      return result;
    }, {});

  profileInfoTitle.textContent = data.name;
  profileInfoDescription.textContent =
    data.description;
  closePopup(popupProfileEdit);
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => addCard(item, deleteCard));
