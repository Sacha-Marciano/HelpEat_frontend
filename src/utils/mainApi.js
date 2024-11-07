const authorization = `Bearer ${localStorage.getItem("jwt")}`;

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.helpeat.jumpingcrab.com"
    : "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const request = (url, options) => {
  return fetch(`${baseURL}/${url}`, options).then(checkResponse);
};

const getServerRecipes = () => {
  return request(`recipes`);
};

const addServerRecipe = (data) => {
  return request(`recipes`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(data),
  });
};

const deleteServerRecipe = (data) => {
  return request(`recipes`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(data),
  });
};

const addFavoriteRecipe = (data) => {
  return request(`users/favorite`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(data),
  });
};

const deleteFavoriteRecipe = (data) => {
  return request(`users/favorite`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(data),
  });
};

const addScheduleRecipe = (data) => {
  return request(`users/schedule`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(data),
  });
};

const deleteScheduleRecipe = (data) => {
  return request(`users/schedule`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(data),
  });
};

const getOwner = (data) => {
  return request(`users/${data}/name`);
};

export {
  request,
  getServerRecipes,
  addServerRecipe,
  deleteServerRecipe,
  addFavoriteRecipe,
  deleteFavoriteRecipe,
  addScheduleRecipe,
  deleteScheduleRecipe,
  getOwner,
};
