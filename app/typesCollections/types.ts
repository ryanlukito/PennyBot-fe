export type InputExpensePayload = {
  subject: string;
  merchant: string;
  date: string;
  total: number;
  reimbuse: boolean;
  category: string;
  description: string;
  payment_method: string;
  invoice: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type EditExpensesPayload = {
  subject: string;
  merchant: string;
  date: string;
  total: number;
  reimbuse: boolean;
  category: string;
  description: string;
  payment_method: string;
  invoice: string;
};

export type UpdateUserPayload = {
  firstname: string;
  lastname: string;
  occupation: string;
  nationality: string;
  address: string;
  country: string;
};

export type UpdateIncomePayload = {
  income: number;
};

export type id = {
  id: string
}

export type EditExpensesProps = {
  id: string; // Assuming `id` is a required prop
};
