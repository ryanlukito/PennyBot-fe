"use client";

import React from "react";
import NavBar from "@/app/components/NavBar";
import { FaPlus } from "react-icons/fa6";
import { postExpenses } from "@/app/connections/connectToDB";

const InputExpensesPage = () => {
  // the old one
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formElements = event.currentTarget
  //     .elements as typeof event.currentTarget.elements & {
  //     subject: HTMLInputElement;
  //     merchant: HTMLInputElement;
  //     date: HTMLInputElement;
  //     total: HTMLInputElement;
  //     reimburse: HTMLInputElement;
  //     category: HTMLInputElement;
  //     description: HTMLInputElement;
  //     paymentMethod: HTMLInputElement;
  //     invoiceFile: HTMLInputElement;
  //   };

  //   console.log("Form elements:", formElements);

  //   // Check if the file input exists
  //   if (!formElements.invoiceFile) {
  //     console.error("File input is missing.");
  //     return alert("File input field is not found.");
  //   }

  //   // Check if a file has been selected
  //   if (!formElements.invoiceFile.files || !formElements.invoiceFile.files[0]) {
  //     console.error("No file selected for upload.");
  //     return alert("Please select a file before submitting.");
  //   }

  //   // Create FormData
  //   const formData = new FormData();
  //   formData.append("subject", formElements.subject.value);
  //   formData.append("merchant", formElements.merchant.value);
  //   formData.append("date", formElements.date.value);
  //   formData.append("total", formElements.total.value);
  //   formData.append("reimbuse", formElements.reimburse.checked.toString());
  //   formData.append("category", formElements.category.value);
  //   formData.append("description", formElements.description.value);
  //   formData.append("payment_method", formElements.paymentMethod.value);
  //   formData.append("image", formElements.invoiceFile.files[0]);
  //   console.log(formData);
  //   try {
  //     const response = await postExpenses(formData);
  //     console.log(`Response from API: ${response}`);
  //     alert("Expense Added Successfully!");
  //   } catch (error) {
  //     console.error("Error logging expense:", error);
  //     alert("Expense Added Failed");
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      subject: HTMLInputElement;
      merchant: HTMLInputElement;
      date: HTMLInputElement;
      total: HTMLInputElement;
      reimburse: HTMLInputElement;
      category: HTMLInputElement;
      description: HTMLInputElement;
      paymentMethod: HTMLInputElement;
      invoiceFile: HTMLInputElement;
    };
  
    if (!formElements.invoiceFile || !formElements.invoiceFile.files?.[0]) {
      alert("Please select an invoice file before submitting.");
      return;
    }
  
    const formData = new FormData();
    formData.append("subject", formElements.subject.value);
    formData.append("merchant", formElements.merchant.value);
    formData.append("date", formElements.date.value);
    formData.append("total", formElements.total.value);
    formData.append("reimbuse", formElements.reimburse.checked.toString());
    formData.append("category", formElements.category.value);
    formData.append("description", formElements.description.value);
    formData.append("payment_method", formElements.paymentMethod.value);
    formData.append("image", formElements.invoiceFile.files[0]);

    console.log(formData);
  
    try {
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
      <div className="h-full py-[1.6vw] px-[2vw]">
        <h1 className="text-[2.5vw] font-bold text-[#22B786]">New Expenses</h1>
        <form onSubmit={handleSubmit}>
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
                id="paymentMethod"
                name="paymentMethod"
                required
              />
            </div>

            <button className="w-[8.177vw] h-[2.865vw] font-bold text-[1.042vw] rounded-[0.521vw] bg-[#22B786] text-white hover:scale-[102%] ease-in-out duration-300 ml-[7.7vw]">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="w-[26.302vw] h-[32.76vw] bg-[#E2ECEA] text-[1.042vw] mb-[4.1vw] flex items-center justify-center rounded-[0.521vw] ml-[0.5vw]">
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            id="invoiceFile"
            name="invoiceFile"
            className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
          />
          <label htmlFor="invoiceFile" className="cursor-pointer">
            <FaPlus className="text-[4vw]" />
            <h1 className="text-[1vw]">Upload an Invoice</h1>
          </label>
        </div>
      </div>
    </section>
  );
};

export default InputExpensesPage;
