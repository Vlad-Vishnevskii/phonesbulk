import { FormErrorsLogin } from "./forms";

export type UserData = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  surname: string | null;
  title: string | null;
  company_name: string | null;
  phone: string;
  country: string | null;
  wa_num: string | null;
  telegram: string | null;
  whatsap: string | null;
  is_admin: boolean | null;
  avatar: string | null;
  mailing?: boolean;
};

export type FormUserData = Omit<
  UserData,
  | "id"
  | "provider"
  | "confirmed"
  | "blocked"
  | "createdAt"
  | "updatedAt"
  | "password"
  | "is_admin"
  | "avatar"
>;

export interface FormUserErrors extends Omit<FormErrorsLogin, "name"> {
  username?: string;
}

// className="peer-focus:ring-none focus:box-shadow-none appearance-none rounded-md border-base_grey bg-base_grey text-dark_green focus:outline-none focus:outline-offset-0 peer-focus:border-none peer-focus:outline-none "
