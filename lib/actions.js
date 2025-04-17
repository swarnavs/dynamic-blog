"use server";
import { revalidatePath } from "next/cache";
import { transactionSchema, commentSchema } from "./validation";
import { redirect } from "next/navigation";
import {
  createUser,
  loginUser,
  updateAvtar,
  updateProfileInfo,
} from "./api/user";
import { fetchPostList } from "./api/post";
import { addPostComment } from "./api/comment";
import { cookies } from "next/headers";

const token = cookies().get("auth-token")?.value;

export async function createPost(formData) {
  const validated = transactionSchema.safeParse(formData);
  // if (!validated.success) {
  //   throw new Error("Invalid data");
  // }

  // const { error } = await createClient().from("transactions").insert(formData);

  // if (error) {
  //   throw new Error("Failed creating the transaction");
  // }

  revalidatePath("/blog");
}

export async function addComment(formData, id) {
  const validated = commentSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }

  try {
    const response = await addPostComment(formData, id, token);
    if (response.error) {
      return {
        error: true,
        message: response.error.message || "We can't fetch posts",
        status: response.error.status,
      };
    }
    if (!response.error) {
      return {
        error: false,
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: "Unexpected error occurred!",
    };
  }
}

export async function updateTransaction(id, formData) {
  const validated = transactionSchema.safeParse(formData);
  // if (!validated.success) {
  //   throw new Error("Invalid data");
  // }

  // const { error } = await createClient()
  //   .from("transactions")
  //   .update(formData)
  //   .eq("id", id);

  // if (error) {
  //   throw new Error("Failed creating the transaction");
  // }

  revalidatePath("/dashboard");
}

export async function fetchPost(newtoken) {
  try {
    const response = await fetchPostList(newtoken);

    if (response.error) {
      return {
        error: true,
        message: response.error.message || "We can't fetch posts",
        status: response.error.status,
      };
    }
    if (!response.error) {
      return {
        error: false,
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: "Unexpected error occurred!",
    };
  }
}

export async function deleteTransaction(id) {
  // const supabase = createClient();
  // const { error } = await supabase.from("transactions").delete().eq("id", id);
  // if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await loginUser({
      email,
      password,
    });

    if (response.error) {
      return {
        error: true,
        message: response.error.message || "Error login!",
        status: response.error.status,
      };
    }
    if (!response.error) {
      cookies().set("auth-token", response.data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return {
        error: false,
        token: response.data.token,
        user: response.data.user,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: "Unexpected error occurred!",
    };
  }
}

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await createUser({
      email,
      username,
      password,
    });

    if (response.error) {
      return {
        error: true,
        message: response.error.message || "Error signing up!",
        status: response.error.status,
      };
    }

    return {
      success: true,
      message: `Email sent to ${email}`,
      data: response.data,
    };
  } catch (err) {
    return {
      error: true,
      message: "Unexpected error occurred!",
    };
  }
}

export async function signOut() {
  cookies().delete("auth-token");
  redirect("/login");
}

export async function uploadAvatar(prevState, formData) {
  const file = formData.get("file");
  const { data, error } = await updateAvtar(file, token);
  if (error) {
    return {
      error: true,
      message: "Error uploading avatar",
    };
  }
  return {
    success: true,
    message: "Updated the user avatar",
    data: data,
  };
}

export async function updateProfile(prevState, formData) {
  const username = formData.get("username");
  const { data, error } = await updateProfileInfo(username, token);
  if (error) {
    return {
      error: true,
      message: "Error saving data",
    };
  }
  return {
    success: true,
    message: "Updated the user details",
    data: data,
  };
}
