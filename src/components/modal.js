import {page} from "../components/index.js";

/// Выбираем все модальные окна
const profilePopup = document.querySelector('#profilePopup');
const placePopup = document.querySelector('#placePopup');
const zoomPopup = document.querySelector('#zoomPopup');
const avatarEditPopup = document.querySelector('#avatarEditPopup');
const deleteCardPopup = document.querySelector('#deleteCard');
/// Выбираем все кнопки по нажатию которых будут открываться определенные модальные окна
const profileEditBtn = document.querySelector('.profile__edit-button');
const placeAddBtn = document.querySelector('.profile__add-buttton');
const avatarEditBtn = document.querySelector('#avatar__editBtn');
const cardPhoto = document.querySelectorAll('.cards__photo');
const deleteBtn = document.querySelector('.cards__delete-btn');

//Выбираем элементы по нажатию которых модальные окна будут закрываться 
const profileEditCloseButton = document.querySelector('#profileCloseBtn');
const placeCloseButton = document.querySelector('#placeCloseBtn');
const zoomCloseBtn = document.querySelector('#zoomPopup-close');
const avatarCloseBtn = document.querySelector('#avatarCloseBtn');
const deleteCardBtn = document.querySelector('#deleteCardBtn');


/// Отслеживание событий: нажатие кноки Escape и клик по Overlay
const keyHandler = (popup) => {
  page.addEventListener('keydown', evt => {
    if(evt.key === 'Escape') {
      popup.classList.remove('popup_opened');
    }
   });
  
   page.addEventListener('click', evt => {
    if (evt.target === popup) {
      popup.classList.remove('popup_opened');
    }
  });
}

/// Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
 }

 ///Функция открытия модального окна 
 const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  keyHandler(popup);
 }

///Отслеживание кликов по кнопкам для открытия модальных окон
 profileEditBtn.addEventListener('click', function(){
  openPopup(profilePopup)
});

placeAddBtn.addEventListener('click', function(){
  openPopup(placePopup)
});

avatarEditBtn.addEventListener('click', function(){
  openPopup(avatarEditPopup)
});


///Отслеживание кликов по кнопкам закрытия модальных окон
profileEditCloseButton.addEventListener('click', function(){
  closePopup(profilePopup)
});

zoomCloseBtn.addEventListener('click', function(){
  closePopup(zoomPopup)
 })

placeCloseButton.addEventListener('click', function(){
  closePopup(placePopup)
});

avatarCloseBtn.addEventListener('click', function(){
  closePopup(avatarEditPopup)
});

deleteCardBtn.addEventListener('click', function(){
  closePopup(deleteCardPopup)
})

//Функция открытия модального окна по клику на фото карточки --- нифига не работает 
cardPhoto.forEach(elem =>{
  elem.addEventListener('click',()=>{
    const photoCaption = document.querySelector('.popup__image-caption');
    const zoomImg = document.querySelector('.popup__image');
    openPopup(zoomPopup);
    zoomImg.src = elem.src;
    photoCaption.textContent = elem.alt
  });
})

export {openPopup, closePopup, profilePopup, deleteCardPopup}
