///Рендер карточек 
//Вставить их в разметку

//Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:
//принимает в конструктор её данные и селектор её template-элемента;
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//содержит приватные методы для каждого обработчика;
//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
//Для каждой карточки создайте экземпляр класса Card. 
//Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом. 
//Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
//При клике на карточку эта функция должна открывать попап с картинкой.

///// когда буду все улучшать будет приколько придумать что при ошибки 403 добавлять какую-то другую картинку))
export default class Card {
  constructor(data, selector, currenUserID, handleCardClick, handleLikeClick, handleDeleteClick) {
    this.data = data;
    this.selector = selector;
    this.currenUserID = currenUserID;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick
    this.handleDeleteClick = handleDeleteClick
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this.selector) 
    .content
    .querySelector('.cards__items')
    .cloneNode(true)

    return cardElement
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImg = this._card.querySelector('.cards__photo');
    this._cardTitle = this._card.querySelector('.cards__title');
    this._likeBtn = this._card.querySelector('.cards__like-btn');
    this._likeBtnCounter = this._card.querySelector('.cards__like-btn_counter');
    this._deleteBtn = this._card.querySelector('.cards__delete-btn');

    this._cardImg.src = this.data.link;
    this._cardTitle.textContent = this.data.name;
    this._cardImg.alt = this.data.name;
    this._likeBtnCounter.textContent = this.data.likes.length;

    if (this.data.owner._id === this.currenUserID) {
      this._deleteBtn.classList.add('card__delete-btn_visible');
    }

    if (this.data.likes.some(like => like._id === this.currenUserID)) {
      this._likeBtn.classList.add('cards__like-btn_active');
    }

    this._setEventListeners();
    return this._card
  }

  setLikes(likes) {
    this._likeBtnCounter.textContent = likes.length;
  }

  _toggleBtn() {
    this._likeBtn.classList.toggle('cards__like-btn_active');
  }

  _updateLikeCount() {
    const likesCount = this.data.likes.length;
    this._likeBtnCounter.textContent = likesCount;
  }

  isLiked() {
    return this._likeBtn.classList.contains('cards__like-btn_active');
  }

  getCardId() {
    return this.data._id
  }

  removeCard() {
    this._card.remove();
    //this._card = null;
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => { 
      this.handleCardClick();
    })
    this._likeBtn.addEventListener('click', () => {
      this.handleLikeClick(this)
      this._toggleBtn()
      this._updateLikeCount()
    })
    this._card.addEventListener('click', () => {
      this.getCardId()
    })

    this._deleteBtn.addEventListener('click', () => {
      this.handleDeleteClick(this);
    })
  }
}