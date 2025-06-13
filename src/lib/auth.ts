import Cookies from "js-cookie";

import { fetcher } from "./fetcher";

export const setToken = (name: string, value: string) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set(name, value, { expires: 1 });
};

export const unsetToken = (name: string) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove(name);

};

export const getTokenFromLocalCookie = async () => {
  if (typeof window === "undefined") {
    return;
  }
  const token = await Cookies.get("token");
  return token;
};

export const getUserFromLocalCookie = (jwt: string) => {
  if (jwt) {
    return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => {
        return data;
      })
      .catch(error => console.error(error));
  } else {
    return;
  }
};

export const checkStatus = async () => {
  const token = await getTokenFromLocalCookie();

  if (token) {
    const response = await getUserFromLocalCookie(token);
    return response.is_admin === true;
  }
  return false;
};

export const getAvatar = async () => {
  const token = await getTokenFromLocalCookie();
  if (token) {
    const response = await getUserFromLocalCookie(token);
    return response.avatar;
  }
  return false;
};

export const getIdFromLocalCookie = async () => {
  const jwt = await getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => {
        return data.user.id;
      })
      .catch(error => console.error(error));
  } else {
    return;
  }
};

export const getUserFromEmail = (email: string) => {
  const jwt = process.env.NEXT_PUBLIC_TOKEN;
  if (jwt) {
    return fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?filters[$and][0][email][$eq]=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
      .then(data => {
        return data;
      })
      .catch(error => console.error(error));
  } else {
    return;
  }
};

export const forgotPassword = (email: string) => {
  const body = JSON.stringify({ email });
  return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));
};

export const resetPassword = (code: string, password: string) => {
  return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, password, passwordConfirmation: password }),
  })
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));
};
