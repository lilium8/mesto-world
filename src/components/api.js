export default class Api {
  constructor(options) {
    this.options = options;
  }

  getCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'GET',
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      });
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      });
  }

  updateUserInfo(data) {
    return fetch(`${this.options.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.options.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.status);
          }
        });      
  }

  sendCard(data) {
    return fetch(`${this.options.baseUrl}/cards`, {
        method: 'POST',
        headers: this.options.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.status);
          }
        });
  }

  deleteCard(cardID) {
    return fetch(`${this.options.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: this.options.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.status);
          }
        });
  }

  likeCard(cardID) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: this.options.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.status);
          }
        });
  }

  deleteLike(cardID) {
    return fetch(`${this.options.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: this.options.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.status);
          }
        });
  }

  editAvatar(avatarLink) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.options.headers,
        body: JSON.stringify({
          avatar: avatarLink
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.status);
          }
        });
  }
}