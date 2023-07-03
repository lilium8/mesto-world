// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. 
// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. 
// Вы получаете эти данные от Api. 
// Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице

// Второй параметр конструктора — селектор контейнера, 
// в который нужно добавлять созданные элементы.

// Содержит публичный метод, который отвечает за отрисовку всех элементов. 
// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.


// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.


export default class Section {
  constructor({items, renderer}, selector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(selector);
  }

  renderItems() {
    if (Array.isArray(this.items)) {
      this.items.reverse().forEach((item) => {
        this.renderer(item, this);
      });
    } else {
      this.renderer(this.items, this);
    }
  }

  addItem(element) {
    this.container.prepend(element);
  }
}