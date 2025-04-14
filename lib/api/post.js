import api from "../axios";
import qs from "qs";

export async function createPost({ content, title }) {
  try {
    const response = await api.post(
      "/post/me",
      qs.stringify({ content, title }),
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

export async function fetchPostList(token) {
  try {
    const response = await api.get("/post/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
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

export async function postDetails(id, token) {
  try {
    const response = await api.get(`/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
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
