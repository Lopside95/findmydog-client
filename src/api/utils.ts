import { Add, Route, Update } from "@/types/utils";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

export const baseUrl = import.meta.env.VITE_API_URL;

const getAll = async <T>(route: string): Promise<T | undefined> => {
  try {
    const res = await axios.get(`${baseUrl}/${route}`);
    return res.data as T;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getById = async (route: Route, id: number) => {
  try {
    const res = await axios.get(`${baseUrl}/${route}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const create = async <T>({ route, data }: Add<T>) => {
  try {
    const res = await axios.post(`${baseUrl}/${route}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const update = async <T>({ route, data, id }: Update<T>) => {
  try {
    const res = await axios.put(`${baseUrl}/${route}/${id}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

const deleteContent = async (route: Route, id: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/${route}/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const uploadPhoto = async (
  file: File,
  path: string
): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export { getAll, getById, create, update, deleteContent };
