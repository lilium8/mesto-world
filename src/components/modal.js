const page = document.querySelector('.main');
//Select all modal windows
const profilePopup = document.querySelector('#profilePopup');
const placePopup = document.querySelector('#placePopup');
const zoomPopup = document.querySelector('#zoomPopup');
const avatarEditPopup = document.querySelector('#avatarEditPopup');
const deleteCardPopup = document.querySelector('#deleteCard');
//Select buttons to open specific modal windows
const profileEditBtn = document.querySelector('.profile__edit-button');
const placeAddBtn = document.querySelector('.profile__add-buttton');
const avatarEditBtn = document.querySelector('#avatar__editBtn');
//Select elements to close modal windows
const profileEditCloseButton = document.querySelector('#profileCloseBtn');
const placeCloseButton = document.querySelector('#placeCloseBtn');
const zoomCloseBtn = document.querySelector('#zoomPopup-close');
const avatarCloseBtn = document.querySelector('#avatarCloseBtn');
const deleteCardBtn = document.querySelector('#deleteCardBtn');


//Handle key events and close the modal window
const keyHandler = (popup) => {
  page.addEventListener('keydown', evt => {
    if(evt.key === 'Escape') {
      popup.classList.remove('popup_opened');
    }
   });

   page.addEventListener('click', evt => {
    if (evt.target === popup) {
      popup.classList.remove('popup_opened');
    }
  });
}

//to close a modal window
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
 }

 //to open a modal window 
 const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  keyHandler(popup);
 }

//Event listeners to open modal windows
 profileEditBtn.addEventListener('click', function(){
  openPopup(profilePopup)
});

placeAddBtn.addEventListener('click', function(){
  openPopup(placePopup)
});

avatarEditBtn.addEventListener('click', function(){
  openPopup(avatarEditPopup)
});

//Event listeners to close modal windows
profileEditCloseButton.addEventListener('click', function(){
  closePopup(profilePopup)
});

zoomCloseBtn.addEventListener('click', function(){
  closePopup(zoomPopup)
 })

placeCloseButton.addEventListener('click', function(){
  closePopup(placePopup)
});

avatarCloseBtn.addEventListener('click', function(){
  closePopup(avatarEditPopup)
});

deleteCardBtn.addEventListener('click', function(){
  closePopup(deleteCardPopup)
})

/// modal window for zoom image
const zoomImg = (evt, card) => {
  const photoCaption = document.querySelector('.popup__image-caption');
  const zoomImg = document.querySelector('.popup__image');
  const cardImg = card.querySelector('.cards__photo');
  if(evt.target === cardImg) {
    openPopup(zoomPopup)
    zoomImg.src = cardImg.src;
    photoCaption.textContent = cardImg.alt
  }
};


export {openPopup, closePopup, profilePopup, deleteCardPopup, zoomImg}
