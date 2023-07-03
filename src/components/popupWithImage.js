import Popup from "./popup";

//Создайте класс PopupWithImage, который наследует от Popup. 
//Этот класс должен перезаписывать родительский метод open. 
//В методе open класса PopupWithImage нужно вставлять в попап картинку 
//с src изображения и подписью к картинке.
export default class PopupWithImage extends Popup {
  constructor(data, selector) {
    super(selector);
    this.data = data
    this._image = this.selector.querySelector('.popup__image');
    this._caption = this.selector.querySelector('.popup__image-caption');
  }

  open() {
    this._image.src = this.data.link;
    this._image.alt = this.data.name;
    this._caption.textContent = this.data.name;
    super.open();
  }
}
