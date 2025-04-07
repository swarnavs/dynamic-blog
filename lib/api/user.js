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
    // Default error message
    let message = "Something went wrong";
    let status = null;
    let details = null;

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      status = error.response.data.status_code;
      message = error.response.data?.message || message;
    } else if (error.request) {
      // Request was made but no response received
      message = "No response from server";
    } else {
      // Something else went wrong during setup
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
    // Default error message
    let message = "Something went wrong";
    let status = null;
    let details = null;

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      status = error.response.data.status_code;
      message = error.response.data?.message || message;
    } else if (error.request) {
      // Request was made but no response received
      message = "No response from server";
    } else {
      // Something else went wrong during setup
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
