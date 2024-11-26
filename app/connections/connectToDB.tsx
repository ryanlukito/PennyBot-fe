import axios from "axios";
import {
  // InputExpensePayload,
  SignUpPayload,
  EditExpensesPayload,
  UpdateUserPayload,
  UpdateIncomePayload,
} from "@/app/typesCollections/types";

export const postExpenses = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `https://api.ambagandalf.site/expense`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(`response from API: ${response}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occurred while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const editExpenses = async (
  payload: EditExpensesPayload,
  id: string
) => {
  try {
    const response = await axios.patch(
      `https://api.ambagandalf.site/expense?id=${id}`,
      payload,
      { withCredentials: true }
    );
    console.log(`response from API: ${response}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const postUser = async (payload: SignUpPayload) => {
  try {
    const response = await axios.post(
      `https://api.ambagandalf.site/register`,
      payload,
      { withCredentials: true }
    );
    console.log(`response from API: ${response}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const updateUser = async (payload: UpdateUserPayload) => {
  try {
    const response = await axios.patch(
      `https://api.ambagandalf.site/user`,
      payload,
      { withCredentials: true }
    );
    console.log(`response from API: ${response.data}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const updateIncome = async (payload: UpdateIncomePayload) => {
  try {
    const response = await axios.post(
      `https://api.ambagandalf.site/money`, // nanti diganti
      payload,
      { withCredentials: true }
    );
    console.log(`response from API: ${response.data}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://api.ambagandalf.site/expense/${id}`, // nanti ganti tambahin id-nya
      { withCredentials: true }
    );
    console.log(`response from API: ${response.data}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const getExpenseDetail = async () => {
  try {
    const response = await axios.get(
      `https://api.ambagandalf.site/expense/detail`,
      { withCredentials: true }
    );
    console.log(`response from API: ${response.data}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const getOverview = async () => {
  try {
    const response = await axios.get(
      `https://api.ambagandalf.site/expense/summary`, // nanti diganti
      { withCredentials: true }
    );
    console.log(`response from API: ${response.data}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const getDataUser = async () => {
  try {
    const response = await axios.get(
      `https://api.ambagandalf.site/user`, // nanti diganti
      { withCredentials: true }
    );
    console.log(`response from API: ${response.data}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const getExactExpense = async (id: string) => {
  try {
    const response = await axios.get(
      `https://api.ambagandalf.site/expense/${id}`, // nanti diganti
      { withCredentials: true }
    );
    console.log(`response from API: ${response.data}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data || "An error occured while sending the request"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occured.");
    }
  }
};
