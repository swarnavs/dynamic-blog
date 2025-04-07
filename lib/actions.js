"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";
import { redirect } from "next/navigation";
import { createUser, loginUser } from "./api/user";
import { cookies } from "next/headers";

export async function createTransaction(formData) {
  const validated = transactionSchema.safeParse(formData);
  // if (!validated.success) {
  //   throw new Error("Invalid data");
  // }

  // const { error } = await createClient().from("transactions").insert(formData);

  // if (error) {
  //   throw new Error("Failed creating the transaction");
  // }

  revalidatePath("/dashboard");
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

export async function fetchTransactions(range, offset = 0, limit = 10) {
  // const supabase = createClient();
  // let { data, error } = await supabase.rpc("fetch_transactions", {
  //   limit_arg: limit,
  //   offset_arg: offset,
  //   range_arg: range,
  // });
  // if (error) throw new Error("We can't fetch transactions");
  // return data;
}

export async function deleteTransaction(id) {
  // const supabase = createClient();
  // const { error } = await supabase.from("transactions").delete().eq("id", id);
  // if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
}

export async function login(prevState, formData) {
  console.log("Login click");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("email try to login", email);

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
  console.log("Signup clicked");

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
  // const supabase = createClient();
  // const file = formData.get("file");
  // const fileExt = file.name.split(".").pop();
  // const fileName = `${Math.random()}.${fileExt}`;
  // const { error } = await supabase.storage
  //   .from("avatars")
  //   .upload(fileName, file);
  // if (error) {
  //   return {
  //     error: true,
  //     message: "Error uploading avatar",
  //   };
  // }
  // // Removing the old file
  // const { data: userData, userError } = await supabase.auth.getUser();
  // if (userError) {
  //   return {
  //     error: true,
  //     message: "Something went wrong, try again",
  //   };
  // }
  // const avatar = userData.user.user_metadata.avatar;
  // if (avatar) {
  //   const { error } = await supabase.storage.from("avatars").remove([avatar]);
  //   if (error) {
  //     return {
  //       error: true,
  //       message: "Something went wrong, try again",
  //     };
  //   }
  // }
  // const { error: dataUpdateError } = await supabase.auth.updateUser({
  //   data: {
  //     avatar: fileName,
  //   },
  // });
  // if (dataUpdateError) {
  //   return {
  //     error: true,
  //     message: "Error associating the avatar with the user",
  //   };
  // }
  // return {
  //   message: "Updated the user avatar",
  // };
}

export async function updateSettings(prevState, formData) {
  // const supabase = createClient();
  // const { error } = await supabase.auth.updateUser({
  //   data: {
  //     fullName: formData.get("fullName"),
  //     defaultView: formData.get("defaultView"),
  //   },
  // });
  // if (error) {
  //   return {
  //     error: true,
  //     message: "Failed updating setting",
  //   };
  // }
  // return {
  //   message: "Updated user settings",
  // };
}
