export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((response) => {
      console.log(response.status)
      try {
        if (response.status === 201){
          return response.json();
        }
      } catch(e) {
        return (e)
      }
    })
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((response) => {
      console.log(response.status)
      try {
        if (response.status === 200){
          return response.json();
        }
      } catch(e) {
        return (e)
      }
    })
};

export const email = (JWT) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${JWT}`
    }
  })
    .then((response) => {
      try {
        if (response.status === 201){
          return response.json();
        }
      } catch(e) {
        return (e)
      }
    })
};