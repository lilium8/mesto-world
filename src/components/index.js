import '../index.css';
import './card.js';
import './modal.js';
import './validate.js';
import './api.js';
import './user'

import { closePopup } from "./modal.js";
import { sendCard, getUserInfo } from "./api.js";
import { renderCards } from './card.js';
import { renderUserInfo } from './user';

const placeForm = document.forms.placeForm;
const saveButton = document.querySelector('.popup__submit-btn');


///Функция добавления новых карточек 
const addCard = evt => {
  evt.preventDefault();

  sendCard({
    name: placeForm.elements.placeName.value,
    link: placeForm.elements.placeLink.value
  })
  .then((res) => {
    document.querySelector('.cards__list').prepend(makeCard(res.name,res.link));
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  });
 
  closePopup(placePopup); 
  placeForm.reset();
}

//Получаем данные пользователя и отравляем эти данные для рендера
getUserInfo()
  .then(res => {
    renderUserInfo(res)
    renderCards(res._id)
  })

// При загрузке 
const renderResult = (isLoading) => {
  if (isLoading) {
    saveButton.classList.add('popup__submit-btn_isLoading');
    saveButton.textContent = 'Сохранение...';
  } else {
    saveButton.classList.remove('popup__submit-btn_isLoading');
    saveButton.textContent = 'Сохранить';
  }
};

//Слушатель событий на сабмит модального окна
placeForm.addEventListener('submit', addCard);

export { renderResult }
