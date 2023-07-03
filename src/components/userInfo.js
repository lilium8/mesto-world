//Класс UserInfo отвечает за управление информацией о пользователе на странице. 
//Этот класс:
//Принимает в конструктор объект с селекторами двух элементов: 
   //элемента имени пользователя 
   //элемента информации о себе.
//Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
/////Данные для этого метода нужно получать от методов класса Api — подумайте над тем, 
/////как внедрить метод класса Api в getUserInfo. 
////////Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
////Содержит публичный метод setUserInfo, 
////который принимает новые данные пользователя, 
////отправляет их на сервер и добавляет их на страницу.

export default class UserInfo {
  constructor(profileNameElement, profileInfoElement, profileAvatar) {
    this.profileNameElement = document.querySelector(profileNameElement)
    this.profileInfoElement = document.querySelector(profileInfoElement)
    this.profileAvatarElement = document.querySelector(profileAvatar)
  }

  getUserInfo() {
    return {
      name: this.profileNameElement.textContent,
      about: this.profileInfoElement.textContent,
    }
  }

  setUserInfo(name, about) {
    this.profileNameElement.textContent = name;
    this.profileInfoElement.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this.profileAvatarElement.src = avatarLink;
  }

  saveUserID(userID) {
    this._userID = userID
  }

  getUserID() {
    return this._userID
  }
}