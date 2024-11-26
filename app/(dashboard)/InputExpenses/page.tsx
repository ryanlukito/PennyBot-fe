"use client";

import React from "react";
import NavBar from "@/app/components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { postExpenses } from "@/app/connections/connectToDB";

const InputExpensesPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Create FormData from the form element
    const formData = new FormData(event.currentTarget);
  
    // Handle "reimburse" checkbox explicitly
    const reimburseChecked = (
      event.currentTarget.elements.namedItem("reimburse") as HTMLInputElement
    )?.checked;
    formData.set("reimbuse", reimburseChecked ? "true" : "false");
  
    // Validate required fields
    const requiredFields = ["subject", "merchant", "date", "total", "payment_method"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        alert(`Please fill out the required field: ${field}`);
        return;
      }
    }
  
    // Validate the file upload
    const fileInput = formData.get("invoiceFile") as File | null;
    if (!fileInput) {
      alert("Please upload an invoice file before submitting.");
      return;
    }
    formData.set("invoiceFile", fileInput); // Match field name expected by backend (Multer).
  
    // Debug: Log all FormData entries
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      // Call the API to add the expense
      const result = await postExpenses(formData);
      console.log("Expense added successfully:", result);
      alert("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };
  
  return (
    <section className="bg-[#fff] w-screen h-screen relative text-black flex items-center">
      <NavBar />
      <div className="w-[80.365vw] h-full py-[1.6vw] px-[2vw]">
        <h1 className="text-[2.5vw] font-bold text-[#22B786]">New Expenses</h1>
        <form onSubmit={handleSubmit} className="flex items-center ml-[1vw]">
          <div className="w-[39.323vw] h-[36vw] text-[1.042vw] mt-[2vw] flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h1>Subject</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="subject"
                name="subject"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Merchant</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="merchant"
                name="merchant"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Date</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="date"
                name="date"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Total</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="total"
                name="total"
                required
              />
            </div>
            <div className="px-[7.5vw]">
              <input type="checkbox" id="reimburse" name="reimburse" />
              <label htmlFor="reimburse" className="ml-[0.3vw]">
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
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Description</h1>
              <textarea
                className="bg-[#E2ECEA] w-[31.771vw] h-[5.938vw] rounded-[0.521vw] px-[1vw] resize-none"
                id="description"
                name="description"
                required
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
                id="payment_method"
                name="payment_method"
                required
              />
            </div>

            <button className="w-[8.177vw] h-[2.865vw] font-bold text-[1.042vw] rounded-[0.521vw] bg-[#22B786] text-white hover:scale-[102%] ease-in-out duration-300 ml-[7.7vw]">
              Save
            </button>
          </div>
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

export default InputExpensesPage;
