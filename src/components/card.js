import { getCards, deleteCardAPI } from './api.js'
import { openPopup, closePopup, deleteCardPopup } from './modal.js';

const cardContainer = document.querySelector('.cards__list');
const deleteSubmit = document.querySelector('#submitDeleteBtn');


///Рендер карточек из полученных данных с сервера
const renderCards = (userID) => {
   return getCards()
   .then((result) => {
      const cards = [];
      result.forEach(el => {
        const cardTemplate = document.querySelector('#card_template').content;
        const card = cardTemplate.querySelector('.cards__items').cloneNode(true);
        card.querySelector('.cards__title').textContent = el.name;
        card.querySelector('.cards__photo').src = el.link;
        card.querySelector('.cards__photo').alt = el.name;
        card.querySelector('.cards__like-btn_counter').textContent = el.likes.length;
        cardContainer.append(card);
        cards.push(card);

        if (userID === el.owner._id) {
          const deleteBtn = card.querySelector('.cards__delete-btn');
          deleteBtn.classList.add('card__delete-btn_visible');

          //Функция удаления карточки

          const deleteCard = () => {
            deleteBtn.closest('.cards__items').remove()//тут ошибка а до этого ее не было - нет
          }

          deleteSubmit.addEventListener('click', function() {
            deleteCard();
            closePopup(deleteCardPopup)
          })

          deleteBtn.addEventListener('click', function(){
            openPopup(deleteCardPopup)
            deleteCardAPI(el._id)
          })
        }
    });
    return cards
  })
  .catch(err => console.log(`Ошибка ${err}`))
}


/// Лайк карточки
cardContainer.addEventListener('click', evt => {
  if (evt.target.classList.contains('cards__like-btn')) {
    evt.target.classList.toggle('cards__like-btn_active');
  }
})

export { renderCards }
