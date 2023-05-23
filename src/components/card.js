import { getCards, deleteCardAPI, likeCard, deleteLike } from './api.js'
import { openPopup, closePopup, deleteCardPopup, zoomImg } from './modal.js';

const cardContainer = document.querySelector('.cards__list');
const deleteSubmit = document.querySelector('#submitDeleteBtn');


///Функция создания карточки 
const makeCard = (link, name, likesCount) => {
  const cardTemplate = document.querySelector('#card_template').content;
  const card = cardTemplate.querySelector('.cards__items').cloneNode(true);
  const deleteBtn = card.querySelector('.cards__delete-btn');
  const cardImg = card.querySelector('.cards__photo');

  deleteBtn.classList.add('card__delete-btn_visible');

  card.querySelector('.cards__title').textContent = name;
  card.querySelector('.cards__photo').alt = name;
  card.querySelector('.cards__like-btn_counter').textContent = likesCount;
  cardImg.src = link;

  cardImg.addEventListener('click', (evt) => {
    zoomImg(evt, card)
  });
  return card;
}

///Функция лайка карточки 
const handleLike = (cardElement, cardData) => {
  const likeBtn = cardElement.querySelector('.cards__like-btn');
  const likeCounter = cardElement.querySelector('.cards__like-btn_counter');
  const cardId = cardData._id;
  const isLiked = likeBtn.classList.contains('cards__like-btn_active');
  const method = isLiked ? deleteLike : likeCard;

  method(cardId)
    .then(data => {
      likeBtn.classList.toggle('cards__like-btn_active');
      likeCounter.textContent = data.likes.length;
    })
    .catch(err => console.log(`Ошибка ${err}`));
};

///Функция удаления карточки
const deleteCard = (btn) => {
  btn.closest('.cards__items').remove()
}

///Рендер карточек из полученных данных с сервера
const renderCards = (userID) => {
  return getCards()
    .then((result) => {
      result.forEach(cardData => {
        const card = makeCard(cardData.link, cardData.name, cardData.likes.length);
        const deleteBtn = card.querySelector('.cards__delete-btn');
        const likeBtn = card.querySelector('.cards__like-btn');
        cardContainer.append(card);

        if (userID !== cardData.owner._id) {
          deleteBtn.classList.remove('card__delete-btn_visible');
        }

        deleteBtn.addEventListener('click', function(evt) {
          if (evt.target === deleteBtn) {
            openPopup(deleteCardPopup)
            deleteSubmit.addEventListener('click', function() {
              deleteCard(deleteBtn);
              deleteCardAPI(cardData._id);
              closePopup(deleteCardPopup)
            })
          }
        })

        for (const like of cardData.likes) {
          if (like._id === userID) {
            likeBtn.classList.add('cards__like-btn_active');
            break;
          }
        }

        likeBtn.addEventListener('click', function(data) {
          return function(evt) {
            if (evt.target === likeBtn) {
              handleLike(card, data, userID);
            }
          }
        }(cardData));
      });
    })
    .catch(err => console.log(`Ошибка ${err}`))
}


export { renderCards, makeCard }

