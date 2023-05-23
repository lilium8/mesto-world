import { updateUserInfo, editAvatar } from './api.js';
import { closePopup, profilePopup } from './modal';
import { renderResult } from './index.js';

const profileForm = document.forms.profilePopup;
const avatarFrom = document.forms.avatarFrom;
const profileAvatar = document.querySelector('.profile__avatar');
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__description');

// Render user information on the page
const renderUserInfo = (data) => {
  nameElement.textContent = data.name;
  jobElement.textContent = data.about;
  profileAvatar.src = data.avatar
};


// Handle form submission for updating user information
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  //renderResult(true)///не работает
  const name = profileForm.elements.name.value;
  const about = profileForm.elements.job.value;

  updateUserInfo({ name, about })
    .then((res) => {
        renderUserInfo(res);
    })
    .catch(err => console.log(`Ошибка ${err}`))

    .finally(() => {
      renderResult(false)
    })// не работает
    closePopup(profilePopup); 
    profileForm.reset();
};

profileForm.addEventListener('submit', handleFormSubmit);

// Handle form submission for avatar update
const avatarFormSubmit = (evt) => {
  evt.preventDefault();

  const avatarInput = avatarFrom.elements.avatar;
  const avatarUrl = avatarInput.value;
  const profileAvatar = document.querySelector('.profile__avatar');

  profileAvatar.src = avatarUrl;
  closePopup(avatarEditPopup);
  editAvatar(avatarUrl)
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .catch(err => console.log(`Ошибка ${err}`))
};

avatarFrom.addEventListener('submit', avatarFormSubmit);

export { renderUserInfo };

