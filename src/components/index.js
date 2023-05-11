import '../index.css';
import './card.js';
import './modal.js';
import './validate.js';
import './api.js';
import './user'
import { openPopup, closePopup, profilePopup } from "./modal.js";
import { sendCard, getUserInfo } from "./api.js";
import { renderCards } from './card.js';
import { renderUserInfo } from './user';

const page = document.querySelector('.main');
const placeForm = document.forms.placeForm;
const placeNameInput = placeForm.elements.placeName;
const placeLinkInput = placeForm.elements.placeLink;
const avatarFrom = document.forms.avatarFrom;
const avatarInput = avatarFrom.elements.avatar;
const cardContainer = document.querySelector('.cards__list');

//Получаем данные пользователя и отравляем эти данные для рендера
getUserInfo()
  .then(res => {
    renderUserInfo(res)
    renderCards(res._id)
  })

















/// Изменение аватара
// Функция для вставки данных из инпута в фото профиля
const avatarFormSubmit = (evt) => {
  evt.preventDefault();
  const profileAvatar = document.querySelector('.profile__avatar');
  profileAvatar.src = avatarInput.value
  closePopup(avatarEditPopup)
}

///Функция которая при сабмите удаляет карточку

avatarFrom.addEventListener('submit', avatarFormSubmit)


///Функция добавления новых карточек на страницу
const addCard = evt => {
  evt.preventDefault();

  const cardTemplate = document.querySelector('#card_template').content;
  const cardName = placeNameInput.value;
  const cardLink = placeLinkInput.value;

  const promise = sendCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  });

  promise.then(() => {
    const card = cardTemplate.querySelector('.cards__items').cloneNode(true);// почему это тут
    const deleteBtn = card.querySelector('.cards__delete-btn');
    deleteBtn.classList.add('card__delete-btn_visible');
    const cardImg = card.querySelector('.cards__photo');
    card.querySelector('.cards__title').textContent = cardName;
    cardImg.src = cardLink;
    cardContainer.prepend(card);
  })

 
  closePopup(placePopup); 
  placeForm.reset();
}


//Слушатель событий на сабмит модального окна
placeForm.addEventListener('submit', addCard);

export {page}
//Это не работает пока - потом разберусь
// cardImg.addEventListener('click',() => {
//   openPopup(zoomPopup);
//   photoCaption.textContent = placeNameInput.value;
//   zoomImg.src = cardImg.src;
// })

