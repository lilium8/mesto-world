//PopupWithForm наследуется от Popup +
//Кроме селектора попапа принимает в конструктор колбэк сабмита формы. +


//В этом колбэке содержится метод класса Api.
//Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
//Перезаписывает родительский метод setEventListeners. 
//Метод setEventListeners класса PopupWithForm должен не только 
//добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
//Перезаписывает родительский метод close, 
//так как при закрытии попапа форма должна ещё и сбрасываться.

import Popup from "./popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._form = this.selector.querySelector('.popup__form');
    this._submitBtn = this._form.querySelector('.popup__submit-btn')
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  getFormElement() {
    return this._form;
  }

  getFormValues() {
    return this._getInputValues();
  }

  close() {
    super.close();
    this._form.reset();
  }

  isLoadingMessage(isLoading) {
    if (isLoading === true) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = 'Сохранить';
    }
  }
}