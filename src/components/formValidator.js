//Создайте класс FormValidator, который настраивает валидацию полей формы

//принимает в конструктор объект настроек с селекторами и классами формы;

//принимает вторым параметром элемент той формы, которая валидируется;

//имеет приватные методы, которые обрабатывают форму: 
/// - проверяют валидность поля, 
/// - изменяют состояние кнопки сабмита, 
/// - устанавливают все обработчики;

//имеет публичный метод enableValidation, который включает валидацию формы +

//Для каждой проверяемой формы создавайте экземпляр класса FormValidator.
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._config.input}`));
    this._btn = this._formElement.querySelector(`.${this._config.submitBtn}`);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleBtnState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleBtnState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputError);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputError);
  }


  _toggleBtnState() {
    if(this._isInvalid()) {
      this._btn.classList.add(this._config.disableSubmitBtn);
      this._btn.disabled = true;
    } else {
      this._btn.classList.remove(this._config.disableSubmitBtn);
      this._btn.disabled = false;
    }
  }

  resetValidation() {
    this._toggleBtnState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  _isInvalid() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }
}