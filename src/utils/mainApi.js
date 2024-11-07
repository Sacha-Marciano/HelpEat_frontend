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

export { request, getServerRecipes };
