import { User } from "@/types/posts";
import { toast } from "sonner";
import { LoginSchema, UpdateUserSchema, UserSchema } from "@/types/schemas";
import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

const getUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/users`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
const getUserById = async (userId?: string) => {
  try {
    const res = await axios.get(`${baseUrl}/users/${userId}`);
    const data = res.data;

    const user: User = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
      active: data.active,
      posts: data.posts,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    return user;
  } catch (error) {
    console.error(error);
  }
};
const createUser = async (user: UserSchema) => {
  try {
    const res = await axios.post(`${baseUrl}/users/signup`, user);

    if (res.status === 201) {
      toast("Account created successfully!");
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

const login = async (loginData: LoginSchema) => {
  try {
    const res = await axios.post(`${baseUrl}/users/signin`, loginData);
    const data = res.data;

    localStorage.setItem("authToken", data.authToken);
    if (res.status === 200) {
      toast("Logged in successfully!");
    }
    return res;
  } catch (error) {
    console.error("error in login", error);
  }
};

const getAuthedUser = async () => {
  const authToken = localStorage.getItem("authToken");

  try {
    const res = await axios.get(`${baseUrl}/users/account`, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("There was an error in get authed user", error);
    console.error(error);
  }
};

const updateUser = async (data: UpdateUserSchema) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const res = await axios.put(`${baseUrl}/users/account`, data, {
      headers: {
        authorisation: `Bearer ${authToken}`,
      },
    });

    if (res.status === 200) {
      toast("Details updated successfully!");
      // toaster.success("Details updated successfully!");
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (email: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/users/account`, {
      data: { email },
    });

    if (res.status === 200) {
      toast("Account deleted!");
      // toaster.success("Account deleted!");
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

export {
  createUser,
  getUserById,
  getUsers,
  login,
  getAuthedUser,
  updateUser,
  deleteUser,
};
