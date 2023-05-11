// Добавление класса с ошибкой
const showError = (form,inputElement, errorMessage) => {
  const errorContainer = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorContainer.textContent = errorMessage;
}

// Удаление класса с ошибкой
const hideError = (form, inputElement) => {
  const errorContainer = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorContainer.textContent = '';
}

// Проверка валидности поля 
const checkInputValidity = (form, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(form, inputElement, inputElement.validationMessage);
  } else {
    hideError(form, inputElement);
  }
}
// Проверка валидности всех инпутов на странице
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input',() => {
      checkInputValidity(form, inputElement)
    })
  })
}
// Проверка валидности всех форм на странице
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    })
    setEventListeners(form)
  })
}

enableValidation();

////ТУПОЙ КОД НАДО ПЕРЕПИСАТЬ
const setButtonState = (isFormValid) => {
  const buttonList = Array.from(document.querySelectorAll('.popup__submit-btn'));
  buttonList.forEach(btn => {
    if(isFormValid) {
      btn.removeAttribute('disabled');
      btn.classList.remove('popup__submit-btn_disabled');
    } else {
      btn.setAttribute('disabled', true);
      btn.classList.add('popup__submit-btn_disabled')
    }
  })
}

const profileForm = document.forms.profilePopup;
profileForm.addEventListener('input', () => {
    const profileNameInput = profileForm.elements.name;
    const profileJobInput = profileForm.elements.job;
    const isValid = profileNameInput.validity.valid && profileJobInput.validity.valid;
  setButtonState(isValid);
});

const placeForm = document.forms.placeForm;
placeForm.addEventListener('input', () => {
  const placeNameinput = placeForm.elements.placeName;
  const placeLinkInput = placeForm.elements.placeLink;
  const isValid = placeNameinput.validity.valid && placeLinkInput.validity.valid;
  setButtonState(isValid)
})

const avatarFrom = document.forms.avatarFrom;
avatarFrom.addEventListener('input', ()=> {
  const avatarURLInput = avatarFrom.elements.avatarURL;
  const isValid = avatarURLInput.validity.valid
  setButtonState(isValid)
})
