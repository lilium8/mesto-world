import { getUserInfo, updateUserInfo  } from './api.js'
import { closePopup, profilePopup } from './modal'

//Модальное окно редактирования профиля и его поля
const profileForm = document.forms.profilePopup;
const nameElement = document.querySelector('.profile__name'); 
const jobElement = document.querySelector('.profile__description');


///Рендер пользователя
const renderUserInfo = (data) => {
    const profileAvatar = document.querySelector('.profile__avatar');
    nameElement.textContent = data.name;
    jobElement.textContent = data.about;
    profileAvatar.src = data.avatar;
}




///Вставка данных из ипута в разметку страницы
const handleFormSubmit = evt => {
  evt.preventDefault();
  const promise = updateUserInfo({
    name: profileForm.elements.name.value,
    about: profileForm.elements.job.value
  });
  promise.then(res => {
    if (res.ok) {
      nameElement.textContent = profileForm.elements.name.value;
      jobElement.textContent = profileForm.elements.job.value;
      closePopup(profilePopup);
    }
  })
}
profileForm.addEventListener('submit', handleFormSubmit)

export { renderUserInfo }

