import { request } from "./mainApi";

const signUserUp = (data) => {
  return request(`signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const signUserIn = (data) => {
  return request(`signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const getUserByToken = (token) => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export { signUserIn, signUserUp, getUserByToken };
