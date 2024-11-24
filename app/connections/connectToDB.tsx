import axios from "axios";
import {
  InputExpensePayload,
  SignUpPayload,
  EditExpensesPayload,
  UpdateUserPayload,
  UpdateIncomePayload,
} from "@/app/typesCollections/types";

export const postExpenses = async (payload: InputExpensePayload) => {
  try {
    const response = await axios.post(
      `https://api.ambagandalf.site/expense`,
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

export const editExpenses = async (payload: EditExpensesPayload) => {
  try {
    const response = await axios.patch(
      `https://api.ambagandalf.site/expense/6742e056b01ea27900d11c28`, // nanti diganti
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
      `https://api.ambagandalf.site/register`, // nanti diganti
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

export const deleteExpense = async () => {};

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
