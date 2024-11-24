"use client";

import React from "react";
import NavBar from "@/app/components/NavBar";
import { FaPlus } from "react-icons/fa";
import { editExpenses } from "@/app/connections/connectToDB";
import { EditExpensesPayload } from "@/app/typesCollections/types";
import { useRouter } from "next/router";

// interface EditExpensesProps {
//   id: string; // Assuming `id` is a required prop
// }

const EditExpenses: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Extract `id` from the URL

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      subject: HTMLInputElement;
      merchant: HTMLInputElement;
      date: HTMLInputElement;
      total: HTMLInputElement;
      reimburse: HTMLInputElement;
      category: HTMLInputElement;
      description: HTMLInputElement;
      paymentMethod: HTMLInputElement;
      invoice: HTMLInputElement;
    };

    const payload: EditExpensesPayload = {
      subject: formElements.subject.value,
      merchant: formElements.merchant.value,
      date: formElements.date.value,
      total: parseInt(formElements.total.value),
      reimbuse: formElements.reimburse.checked,
      category: formElements.category.value,
      description: formElements.description.value,
      payment_method: formElements.paymentMethod.value,
      invoice: "dummy",
    };
    console.log(payload);

    // Input expense into database
    try {
      const response = await editExpenses(payload, id as string); // Ensure `id` is a string
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
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Merchant</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="merchant"
                name="merchant"
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Date</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="date"
                name="date"
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Total</h1>
              <input
                type="text"
                className="bg-[#E2ECEA] w-[31.771vw] h-[2.396vw] rounded-[0.521vw] px-[1vw]"
                id="total"
                name="total"
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
              />
            </div>
            <div className="flex justify-between items-center">
              <h1>Description</h1>
              <textarea
                className="bg-[#E2ECEA] w-[31.771vw] h-[5.938vw] rounded-[0.521vw] px-[1vw] resize-none"
                id="description"
                name="description"
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
              />
            </div>
            <button className="w-[8.177vw] h-[2.865vw] font-bold text-[1.042vw] rounded-[0.521vw] bg-[#22B786] text-white hover:scale-[102%] ease-in-out duration-300 ml-[7.7vw]">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="w-[26.302vw] h-[32.76vw] bg-[#E2ECEA] text-[1.042vw] mb-[4.1vw] flex items-center justify-center rounded-[0.521vw]">
        <button className="flex flex-col items-center justify-center">
          <FaPlus className="text-[4vw]" />
          <h1>Upload an Invoice</h1>
        </button>
      </div>
    </section>
  );
};

export default EditExpenses;
