"use client";

import React, { useState } from "react";
import NavBar from "../components/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Expense {
  _id: string;
  subject: string;
  merchant: string;
  date: string;
  total: number;
  reimbuse: boolean;
  category: string;
  description: string;
  payment_method: string;
}

const Page = () => {
  const dummyExpenses: Expense[] = Array.from({ length: 20 }, (_, i) => ({
    _id: `${i + 1}`,
    subject: `Dummy ${i + 1}`,
    merchant: `Merchant ${i + 1}`,
    date: new Date(2024, i % 12, i + 1).toISOString(),
    total: Math.floor(Math.random() * 1000000),
    reimbuse: i % 2 === 0,
    category: ["food", "groceries", "health", "electricity", "transportation", "entertainment"][i % 6],
    description: `Description for Dummy ${i + 1}`,
    payment_method: ["Cash", "Credit Card", "Debit Card"][i % 3],
  }));

  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    setCurrentPage(1);
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      // Filter by category
      if (selectedCategory !== "all") {
        return expense.category === selectedCategory;
      }
      return true;
    })
    .filter((expense) => {
      // Filter by date range
      if (dateRange[0] && dateRange[1]) {
        const expenseDate = new Date(expense.date).setHours(0, 0, 0, 0); // Parse expense date and normalize to start of the day
        const startDate = new Date(dateRange[0]).setHours(0, 0, 0, 0); // Start of the selected day
        const endDate = new Date(dateRange[1]).setHours(23, 59, 59, 999); // End of the selected day
        return expenseDate >= startDate && expenseDate <= endDate;
      }
      return true; // If no date range selected, include all expenses
    });

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * expensesPerPage,
    currentPage * expensesPerPage
  );

  return (
    <section className="bg-[#E2ECEA] w-screen h-screen relative text-black flex flex-row overflow-hidden">
      <NavBar />
      <div className="flex flex-col w-[75.469vw] ml-[1vw] mt-[1vw] p-6 overflow-auto">
        <div className="w-full flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-gray-700">Expenses Detail</div>
          <DatePicker
            selectsRange
            startDate={dateRange[0] || undefined}
            endDate={dateRange[1] || undefined}
            onChange={(update: [Date | null, Date | null]) => handleDateChange(update)}
            isClearable
            className="p-2 rounded border border-gray-300"
            placeholderText="Select Date Range"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex space-x-2 mb-4 items-center">
          {[
            { name: "all", color: "#e0e0e0" },
            { name: "food", color: "#cbffbb" },
            { name: "groceries", color: "#ffffa3" },
            { name: "health", color: "#d7f9ff" },
            { name: "electricity", color: "#ffd6d6" },
            { name: "transportation", color: "#ffd27a" },
            { name: "entertainment", color: "#e3d7ff" },
          ].map((category) => (
            <button
              key={category.name}
              className="px-4 py-2 rounded-md text-gray-700 font-semibold"
              style={{ backgroundColor: category.color }}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </div>

        {/* Expenses Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-md mt-4">
            <thead>
              <tr className="bg-[#009c41] text-white text-left">
                <th className="p-3">Subject</th>
                <th className="p-3">Merchant</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Reimbursable</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedExpenses.map((expense) => (
                <tr key={expense._id} className="border-b">
                  <td className="p-3">{expense.subject}</td>
                  <td className="p-3">{expense.merchant}</td>
                  <td className="p-3">
                    {new Date(expense.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3">Rp{expense.total.toLocaleString("id-ID")}</td>
                  <td className="p-3">{expense.payment_method}</td>
                  <td className="p-3">{expense.reimbuse ? "Yes" : "No"}</td>
                  <td className="p-3">{expense.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4 items-center">
          <span className="text-gray-700">
            Showing {paginatedExpenses.length > 0 ? (currentPage - 1) * expensesPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * expensesPerPage, filteredExpenses.length)} of {filteredExpenses.length} entries
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-[#009c41] text-white rounded-full hover:bg-[#006f2e] disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>{`Page ${currentPage}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * expensesPerPage >= filteredExpenses.length}
              className="px-4 py-1 bg-[#009c41] text-white rounded-full hover:bg-[#006f2e]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
