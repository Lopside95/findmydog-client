export type FormInput = {
  name: string;
  label: string;
  desc?: string;
  placeholder?: string;
  type?: string;
  cn?: string;
  defVal?: string | number;
};

export type DynamicParams = Promise<{ id: string }>;

export type Route = "users" | "posts" | "tags";

export interface Add<T> {
  route: Route;
  data: T;
}
export interface Update<T> {
  route: Route;
  data: T;
  id: number | undefined;
}
