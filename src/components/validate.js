const profileForm = document.forms.profilePopup;
const placeForm = document.forms.placeForm;
const avatarForm = document.forms.avatarFrom;


// add error class 
const showError = (form,inputElement, errorMessage) => {
  const errorContainer = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorContainer.textContent = errorMessage;
}

// remove error class
const hideError = (form, inputElement) => {
  const errorContainer = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorContainer.textContent = '';
}

// check the validity of an input field 
const checkInputValidity = (form, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(form, inputElement, inputElement.validationMessage);
  } else {
    hideError(form, inputElement);
  }
}
// set event listeners for input fields
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input',() => {
      checkInputValidity(form, inputElement)
    })
  })
}
// enable form validation
const enableValidation = (form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(form);
};

enableValidation(profileForm);
enableValidation(placeForm);
enableValidation(avatarForm);



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



profileForm.addEventListener('input', () => {
    const profileNameInput = profileForm.elements.name;
    const profileJobInput = profileForm.elements.job;
    const isValid = profileNameInput.validity.valid && profileJobInput.validity.valid;
    setButtonState(isValid);
});


placeForm.addEventListener('input', () => {
  const placeNameinput = placeForm.elements.placeName;
  const placeLinkInput = placeForm.elements.placeLink;
  const isValid = placeNameinput.validity.valid && placeLinkInput.validity.valid;
  setButtonState(isValid)
})


avatarForm.addEventListener('input', ()=> {
  const avatarURLInput = avatarFrom.elements.avatarURL;
  const isValid = avatarURLInput.validity.valid
  setButtonState(isValid)
})
