export type Links = {
  id: number;
  name: string;
  link: string | { pathname: string; query?: { [key: string]: any } };
};
