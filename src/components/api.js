///Получаем массив объектов с сервера с данными карточек
function getCards() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
    method: 'GET',
    headers: {
      authorization: '47630fd7-d22e-4429-9c8d-fa77ac8ebf56',
      'Content-Type': 'application/json',
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  })
}

/// Получаем данные о пользователе с сервера 
function getUserInfo() {
  return fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
    method: 'GET',
    headers: {
      authorization: '47630fd7-d22e-4429-9c8d-fa77ac8ebf56',
      'Content-Type': 'application/json',
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  })
}

///Отправляем полученные данные о пользователе на сервер
function updateUserInfo(data) {
  return fetch('https://nomoreparties.co/v1/cohort-26/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '47630fd7-d22e-4429-9c8d-fa77ac8ebf56',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: data.name,
    about: data.about
  })
})
.then(res => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status)
  }
})
}

//Отправляем данные новой карточки на сервер

const sendCard = (data) => {
  return fetch('https://nomoreparties.co/v1/cohort-26/cards',{
    method: 'POST',
    headers: {
      authorization: '47630fd7-d22e-4429-9c8d-fa77ac8ebf56',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  })
}

//Отправляем данные об удаленной карточки на сервер 

const deleteCardAPI = (cardID) => {
  return fetch(`https://nomoreparties.co/v1/cohort-26/cards/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: '47630fd7-d22e-4429-9c8d-fa77ac8ebf56',
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  })
}





export { getCards, getUserInfo, updateUserInfo, sendCard, deleteCardAPI }