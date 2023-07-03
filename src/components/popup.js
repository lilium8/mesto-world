//Создайте класс Popup, который отвечает за открытие и закрытие попапа. 
//Этот класс:
//Принимает в конструктор единственный параметр — селектор попапа.--
//Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.--
//Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.--
//Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.--
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.--


export default class Popup {
  constructor(selector) {
    this.selector = document.querySelector(selector);
  }

  open() {
    this.selector.classList.add('popup_opened')
  }

  close() {
    this.selector.classList.remove('popup_opened')
    this._handleEscClose(this.selector)
  }

  _handleEscClose(selector) {
    document.addEventListener('keydown', evt => {
      if(evt.key === 'Escape') {
        selector.classList.remove('popup_opened');
      }
     });
  
     document.addEventListener('click', evt => {
      if (evt.target === this.selector) {
        selector.classList.remove('popup_opened');
      }
    });
  }

  setEventListeners() {
    this.selector.querySelector('.popup__close-btn')
    .addEventListener('click', () => this.close())
  }
}