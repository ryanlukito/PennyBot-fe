"use client";

import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import { FaPlus } from "react-icons/fa";
import { editExpenses, getExactExpense } from "@/app/connections/connectToDB";
// import { EditExpensesPayload } from "@/app/typesCollections/types";
import { useSearchParams } from "next/navigation";

interface ExpenseItem {
  _id: string;
  subject: string;
  merchant: string;
  date: string;
  total: number;
  reimbuse: boolean;
  category: string;
  description: string;
  payment_method: string;
  invoice: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ExpenseData {
  item: ExpenseItem;
}

const EditExpenses: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [expenseData, setExpenseData] = useState<ExpenseData | null>(null);

  useEffect(() => {
    if (!id) {
      alert("No Expense ID provided.");
    } else {
      const fetchData = async () => {
        const data = await getExactExpense(id);
        setExpenseData(data);
      };
      fetchData();
    }
  }, [id]);

  console.log(expenseData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    const reimburseChecked = (
      event.currentTarget.elements.namedItem("reimburse") as HTMLInputElement
    )?.checked;
    formData.set("reimbuse", reimburseChecked ? "true" : "false");

    const requiredFields = ["subject", "merchant", "date", "total", "payment_method"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        alert(`Please fill out the required field: ${field}`);
        return;
      }
    }

    const fileInput = formData.get("invoiceFile") as File | null;
    if (!fileInput) {
      alert("Please upload an invoice file before submitting.");
      return;
    }
    formData.set("invoiceFile", fileInput);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Input expense into database
    try {
      const response = await editExpenses(formData, id as string);
      console.log(`Response from API: ${response.data}`);
      alert("Expense Update Successfully!");
    } catch (error) {
      console.error("Error logging expense:", error);
      alert("Expense Update Failed");
    }
  };

  return (
    <section className="bg-[#fff] w-screen h-screen relative text-black flex items-center">
      <NavBar />
      <div className="h-full py-[1.6vw] px-[2vw]">
        <h1 className="text-[2.5vw] font-bold text-[#22B786]">Edit Expenses</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-[39.323vw] h-[36vw] text-[1.042vw] mt-[2vw] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h1>Subject</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="subject"
                name="subject"
                placeholder={expenseData?.item?.subject || ""}
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Merchant</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="merchant"
                name="merchant"
                placeholder={expenseData?.item?.merchant || ""}
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Date</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="date"
                name="date"
                placeholder={expenseData?.item?.date || ""}
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Total</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="total"
                name="total"
                placeholder={expenseData?.item?.total?.toString() || ""}
              />
            </div>
            <div className="px-[7.5vw]">
              <input type="checkbox" id="reimburse" name="reimburse" />
              <label htmlFor="" className="ml-[0.3vw]">
                Reimbursable
              </label>
            </div>
            <div className="flex justify-between items-center">
              <h1>Category</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="category"
                name="category"
                placeholder={expenseData?.item?.category || ""}
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Description</h1>
              <textarea
                className="bg-[#E2ECEA] w-[31.771vw] h-[5.938vw] rounded-[0.521vw] px-[1vw] resize-none"
                id="description"
                name="description"
                placeholder={expenseData?.item?.description || ""}
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>
                Payment <br />
                Method
              </h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="paymentMethod"
                name="paymentMethod"
                placeholder={expenseData?.item?.payment_method || ""}
              />
            </div>
            <button className="w-[8.177vw] h-[2.865vw] font-bold text-[1.042vw] rounded-[0.521vw] bg-[#22B786] text-white hover:scale-[102%] ease-in-out duration-300 ml-[7.7vw]">
              Save
            </button>
          </div>
          {/* disini */}
          <div className="w-[26.302vw] h-[32.76vw] bg-[#E2ECEA] text-[1.042vw] mb-[4.1vw] flex items-center justify-center rounded-[0.521vw] ml-[0.5vw]">
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                id="invoiceFile"
                name="invoiceFile"
                className="hidden"
              />
              <label
                htmlFor="invoiceFile"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaPlus className="text-[4vw]" />
                <h1 className="text-[1vw]">Upload an Invoice</h1>
              </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditExpenses;
