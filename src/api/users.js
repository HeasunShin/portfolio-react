const API_URL = import.meta.env.VITE_API_URL;

export function createUser(user) {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  });
}
export function loginUser(user) {
  return fetch(`${API_URL}/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  });
}

export function getCurrentUser() {
  return fetch(`${API_URL}/users/me`, {
    credentials: "include",
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  });
}

export function logoutUser() {
  return fetch(`${API_URL}/users/logout`, {
    method: "POST",
    credentials: "include",
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  });
}
