import axios from "axios";
import {
  InputExpensePayload,
  SignUpPayload,
  EditExpensesPayload,
} from "../typesCollections/types";

export const postExpenses = async (payload: InputExpensePayload) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/expense`, // nanti diganti
      payload
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

export const editExpenses = async (payload: EditExpensesPayload) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/expense`, // nanti diganti
      payload
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

export const postUser = async (payload: SignUpPayload) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/register`, // nanti diganti
      payload
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
      `http://localhost:4000/expense` // nanti diganti
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
      `http://localhost:4000/expense/summary` // nanti diganti
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
