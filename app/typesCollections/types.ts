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
  category: string;
  description: string;
  payment_method: string;
};
