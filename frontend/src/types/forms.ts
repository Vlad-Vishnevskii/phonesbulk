export type FormDataLogin = {
  email: string;
  password: string;
};

export interface FormErrorsLogin {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
}

export type FormDataCreate = {
  name: string;
  surname?: string;
  title?: string;
  email: string;
  company_name?: string;
  phone: string;
  country?: string;
  wa_num?: string;
  password: string;
  is_admin?: boolean;
};

export interface SwitchFormProps {
  switchForm: (mode: string) => void;
  login: (token: string, email: string, id: string) => void;
  onClose: () => void;
  onOpen: () => void;
}

export interface FormDataCheckout {
  email: string;
  userId: string;
  country: string;
  address1: string;
  address2: string;
  name: string;
  surname: string;
  company: string;
  designation: string;
  phone: string;
  whatsap: string;
}

export interface FormContacts {
  name: string;
  email: string;
  phone: string;
  messText: string;
}

export interface FormErrorsContacts {
  name?: string;
  email?: string;
  phone?: string;
  messText?: string;
}
