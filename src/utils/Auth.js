class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkRes(res) {
      try {
        if (res.status === 200 || res.status === 201){
          return res.json();
        }
      } catch(e) {
        return (e)
      }
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(this._checkRes)
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(this._checkRes)
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
      .then(this._checkRes)
  }
}

const authentication = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
});

export default authentication;