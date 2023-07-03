import '../index.css';
import {
  placeAddBtn,
  profileBtn,
  avatarAddBtn,
  config
} from '../../utils/constants';
import Api from './api';
import Card from './card.js';
import UserInfo from './userInfo';
import Section from './section';
import PopupWithImage from './popupWithImage';
import PopupWithForm from './popupWithForm';
import FormValidator from './formValidator';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '47630fd7-d22e-4429-9c8d-fa77ac8ebf56',
    'Content-Type': 'application/json'
  }
});

const user = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const handleLikeClick = (card) => {
  const cardId = card.getCardId();
  const isLiked = card.isLiked();
  if (isLiked) {
    api.deleteLike(cardId)
      .then(result => {
        card.setLikes(result.likes);
      })
      .catch(err => {
        console.log(`Ошибка при удалении лайка: ${err}`);
      });
  } else {
    api.likeCard(cardId)
      .then(result => {
        card.setLikes(result.likes);
      })
      .catch(err => {
        console.log(`Ошибка при добавлении лайка: ${err}`);
      });
  }
};

const handleDeleteClick = (card) => {
  const deleteCard = () => {
    const cardId = card.getCardId();
    api.deleteCard(cardId)
      .then(() => {
        card.removeCard();
        deletePopup.close();
      })
      .catch(err => {
        console.log(`Ошибка при удалении карточки: ${err}`);
      });
  };

  const deletePopup = new PopupWithForm('#deleteCard', deleteCard);
  deletePopup.open();
  deletePopup.setEventListeners();
};

const cardRenderer = (cardData, section) => {
  const zoomPopup = new PopupWithImage(cardData, '#zoomPopup');
  zoomPopup.setEventListeners();
  const handleCardClick = () => zoomPopup.open();

  const card = new Card(
    cardData,
    '#card_template',
    user.getUserID(),
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  );

  const cardElement = card.generateCard(cardData.owner._id, user.getUserID());
  section.addItem(cardElement);
};

api.getUserInfo()
  .then(res => {
    user.saveUserID(res._id);
    user.setUserInfo(res.name, res.about);
    user.setUserAvatar(res.avatar);

    api.getCards()
      .then(items => {
        const cardSection = new Section({
          items,
          renderer: cardRenderer,
        }, '.cards__list');
        cardSection.renderItems();
      })
      .catch(err => {
        console.log(`Ошибка при получении карточек: ${err}`);
      });
  })
  .catch(err => {
    console.log(`Ошибка при получении информации о пользователе: ${err}`);
  });

const addCardHandler = (data) => {
  placePopup.isLoadingMessage(true);
  api.sendCard({
    name: data.placeName,
    link: data.placeLink
  })
    .then((res) => {
      const cardSection = new Section({
        items: res,
        renderer: cardRenderer,
      }, '.cards__list');
      cardSection.renderItems();
    })
    .catch(err => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      placePopup.close();
      placePopup.isLoadingMessage(false);
    });
};

const addBIO = (data) => {
  profilePopup.isLoadingMessage(true);
  api.updateUserInfo({
    name: data.name,
    about: data.about
  })
    .then(res => {
      user.setUserInfo(res.name, res.about);
    })
    .catch(err => {
      console.log(`Ошибка при обновлении информации о пользователе: ${err}`);
    })
    .finally(() => {
      profilePopup.close();
      profilePopup.isLoadingMessage(false);
    });
};

const addProfilePic = (formData) => {
  userPic.isLoadingMessage(true);
  api.editAvatar(formData.avatarURL)
    .then(res => {
      user.setUserAvatar(res.avatar);
    })
    .catch(err => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      userPic.close();
      userPic.isLoadingMessage(false);
    });
};

const placePopup = new PopupWithForm('#placePopup', addCardHandler);
const placePopupValidation = new FormValidator(config, placePopup.getFormElement());
placePopupValidation.enableValidation();
placeAddBtn.addEventListener('click', () => {
  placePopupValidation.resetValidation();
  placePopup.open();
  placePopup.setEventListeners();
});

const profilePopup = new PopupWithForm('#profilePopup', addBIO);
const profilePopupValidation = new FormValidator(config, profilePopup.getFormElement());
profilePopupValidation.enableValidation();
profileBtn.addEventListener('click', () => {
  profilePopupValidation.resetValidation();
  profilePopup.open();
  profilePopup.setEventListeners();
});

const userPic = new PopupWithForm('#avatarEditPopup', addProfilePic);
userPic.setEventListeners();
const updateUserPicPopupValidation = new FormValidator(config, userPic.getFormElement());
updateUserPicPopupValidation.enableValidation();
avatarAddBtn.addEventListener('click', () => {
  updateUserPicPopupValidation.resetValidation();
  userPic.open();
});








