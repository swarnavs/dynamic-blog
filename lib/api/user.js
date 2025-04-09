import api from "../axios";
import qs from "qs";

export async function createUser({ email, username, password }) {
  try {
    const response = await api.post(
      "/user/signup",
      qs.stringify({ email, username, password }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    let message = "Something went wrong";
    let status = null;

    if (error.response) {
      status = error.response.data.status_code;
      message = error.response.data?.message || message;
    } else if (error.request) {
      message = "No response from server";
    } else {
      message = error.message;
    }

    return {
      data: null,
      error: {
        message,
        status,
      },
    };
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await api.get(
      "/user/login",
      { params: { email, password } },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    let message = "Something went wrong";
    let status = null;

    if (error.response) {
      status = error.response.data.status_code;
      message = error.response.data?.message || message;
    } else if (error.request) {
      message = "No response from server";
    } else {
      message = error.message;
    }

    return {
      data: null,
      error: {
        message,
        status,
      },
    };
  }
}

export async function updateAvtar(file, token) {
  try {
    const formData = new FormData();
    formData.append("profile_pic", file);
    const response = await api.patch("/user/update/profilePic", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return { data: response.data, error: null };
  } catch (error) {
    let message = "Something went wrong";
    let status = null;

    if (error.response) {
      status = error.response.data.status_code;
      message = error.response.data?.message || message;
    } else if (error.request) {
      message = "No response from server";
    } else {
      message = error.message;
    }

    return {
      data: null,
      error: {
        message,
        status,
      },
    };
  }
}

export async function updateProfileInfo(username, token) {
  console.log("usernames", username);
  console.log("token", token);

  try {
    const response = await api.patch(
      "/user/update/profile",
      qs.stringify({ username }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: response.data, error: null };
  } catch (error) {
    let message = "Something went wrong";
    let status = null;

    if (error.response) {
      status = error.response.data.status_code;
      message = error.response.data?.message || message;
    } else if (error.request) {
      message = "No response from server";
    } else {
      message = error.message;
    }

    return {
      data: null,
      error: {
        message,
        status,
      },
    };
  }
}
