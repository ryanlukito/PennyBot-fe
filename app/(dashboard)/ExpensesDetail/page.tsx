"use client";
import React, { useState } from "react";
import NavBar from "@/app/components/NavBar";
import "tailwindcss/tailwind.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format, addMonths, subMonths, addDays, startOfMonth } from "date-fns";
import Link from "next/link";
// import { getExpenseDetail } from "@/app/connections/connectToDB";

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

const ExpensesPage = () => {
  const dummyExpenses: Expense[] = Array.from({ length: 20 }, (_, i) => ({
    _id: `${i + 1}`,
    subject: `Dummy ${i + 1}`,
    merchant: `Merchant ${i + 1}`,
    date: new Date(2024, i % 12, i + 1).toISOString(),
    total: Math.floor(Math.random() * 1000000),
    reimbuse: i % 2 === 0,
    category: [
      "food",
      "groceries",
      "health",
      "electricity",
      "transportation",
      "entertainment",
    ][i % 6],
    description: `Description for Dummy ${i + 1}`,
    payment_method: ["Cash", "Credit Card", "Debit Card"][i % 3],
  }));

  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [date, setDate] = useState<{ from?: Date; to?: Date }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonthFrom, setCurrentMonthFrom] = useState(new Date());
  const [currentMonthTo, setCurrentMonthTo] = useState(
    addMonths(new Date(), 1)
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleDateChange = (dates: { from?: Date; to?: Date }) => {
  //   setDate(dates);
  //   setCurrentPage(1);
  // };

  // Add a function to delete an expense by ID
  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense._id !== id);
    setExpenses(updatedExpenses);
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      if (selectedCategory !== "all") {
        return expense.category === selectedCategory;
      }
      return true;
    })
    .filter((expense) => {
      if (date.from && date.to) {
        const expenseDate = new Date(expense.date).setHours(0, 0, 0, 0);
        const startDate = new Date(date.from).setHours(0, 0, 0, 0);
        const endDate = new Date(date.to).setHours(23, 59, 59, 999);
        return expenseDate >= startDate && expenseDate <= endDate;
      }
      return true;
    });

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * expensesPerPage,
    currentPage * expensesPerPage
  );

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const togglePopover = () => setIsOpen(!isOpen);

  const renderDays = (month: Date) => {
    const startDate = startOfMonth(month);
    const daysInMonth = Array.from({ length: 42 }).map((_, index) =>
      addDays(startDate, index - startDate.getDay())
    );

    return daysInMonth.map((day, index) => {
      const isSelected =
        (date.from &&
          format(day, "yyyy-MM-dd") === format(date.from, "yyyy-MM-dd")) ||
        (date.to &&
          format(day, "yyyy-MM-dd") === format(date.to, "yyyy-MM-dd"));
      const isInRange =
        date.from && date.to && day >= date.from && day <= date.to;
      const isDisabled = day.getMonth() !== month.getMonth();

      return (
        <button
          key={index}
          className={`p-2 text-center rounded-md ${
            isSelected
              ? "bg-blue-500 text-white"
              : isInRange
              ? "bg-blue-100"
              : isDisabled
              ? "text-gray-400"
              : "hover:bg-gray-200"
          }`}
          onClick={() => !isDisabled && handleDateClick(day)}
          disabled={isDisabled}
        >
          {format(day, "d")}
        </button>
      );
    });
  };

  const handleDateClick = (day: Date) => {
    if (!date.from || (date.from && date.to)) {
      setDate({ from: day, to: undefined });
    } else {
      setDate({ from: date.from, to: day });
    }
  };

  // try {
  //   const response = getExpenseDetail();
  //   console.log(`Response from API: ${response}`);
  // } catch (error) {
  //   console.log("gagal karena ga ada user_id");
  //   console.error("Error logging expense:", error);
  // }

  return (
    <>
      <div className="bg-[#E2ECEA] w-screen h-screen text-black flex flex-start items-start">
        <NavBar />
        <div className="mx-5 w-screen">
          <div className="container mx-auto py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#575252]">
                Expenses Detail
              </h1>
              <div className="relative">
                <button
                  onClick={togglePopover}
                  className="w-[270px] flex items-center gap-2 px-4 py-2 border rounded-xl shadow-md bg-white hover:bg-gray-100 focus:ring focus:ring-blue-300"
                >
                  <FaCalendarAlt className="w-5 h-5 text-gray-500" />
                  {date.from ? (
                    date.to ? (
                      `${format(date.from, "LLL dd, y")} - ${format(
                        date.to,
                        "LLL dd, y"
                      )}`
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-2 w-[590px] p-4 bg-white shadow-lg rounded-lg right-0">
                    <div className="flex justify-between items-center mb-4">
                      {/* Start Date Calendar */}
                      <div className="flex flex-col items-center">
                        <h1>Start Date</h1>
                        <div className="flex justify-between items-center">
                          <button
                            className="p-2 rounded-full hover:bg-gray-200"
                            onClick={() =>
                              setCurrentMonthFrom(
                                subMonths(currentMonthFrom, 1)
                              )
                            }
                          >
                            {"<"}
                          </button>
                          <span className="px-4">
                            {format(currentMonthFrom, "MMMM yyyy")}
                          </span>
                          <button
                            className="p-2 rounded-full hover:bg-gray-200"
                            onClick={() =>
                              setCurrentMonthFrom(
                                addMonths(currentMonthFrom, 1)
                              )
                            }
                          >
                            {">"}
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mt-2">
                          {daysOfWeek.map((day) => (
                            <div
                              key={day}
                              className="text-center font-medium text-gray-500"
                            >
                              {day}
                            </div>
                          ))}
                          {renderDays(currentMonthFrom)}
                        </div>
                      </div>

                      {/* End Date Calendar */}
                      <div className="flex flex-col items-center">
                        <h1>End Date</h1>
                        <div className="flex justify-between items-center">
                          <button
                            className="p-2 rounded-full hover:bg-gray-200"
                            onClick={() =>
                              setCurrentMonthTo(subMonths(currentMonthTo, 1))
                            }
                          >
                            {"<"}
                          </button>
                          <span className="px-4">
                            {format(currentMonthTo, "MMMM yyyy")}
                          </span>
                          <button
                            className="p-2 rounded-full hover:bg-gray-200"
                            onClick={() =>
                              setCurrentMonthTo(addMonths(currentMonthTo, 1))
                            }
                          >
                            {">"}
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mt-2">
                          {daysOfWeek.map((day) => (
                            <div
                              key={day}
                              className="text-center font-medium text-gray-500"
                            >
                              {day}
                            </div>
                          ))}
                          {renderDays(currentMonthTo)}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button
                        className="px-4 py-2 text-black bg-[#22B786] rounded-lg hover:bg-blue-600"
                        onClick={togglePopover}
                      >
                        Confirm
                      </button>
                      <button
                        className="px-4 py-2 text-black bg-[#22B786] rounded-lg hover:bg-gray-200"
                        onClick={() =>
                          setDate({ from: undefined, to: undefined })
                        }
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filter by Category */}
            <div className="flex justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {[
                  "all",
                  "food",
                  "groceries",
                  "health",
                  "electricity",
                  "transportation",
                  "entertainment",
                ].map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg ${
                      selectedCategory === category
                        ? "bg-[#22B786]"
                        : "bg-gray-300"
                    } hover:bg-[#22B786] text-black font-bold`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Expenses Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="min-w-full">
                <thead className="bg-green-400">
                  <tr>
                    <th className="py-3 px-6 text-left">Subject</th>
                    <th className="py-3 px-2 text-center">Date</th>
                    <th className="py-3 px-3 text-center">Category</th>
                    <th className="py-3 px-6 text-center">Total</th>
                    <th className="py-3 px-2 text-center">Payment Method</th>
                    <th className="py-3 px-3 text-center">Reimbursable</th>
                    <th className="py-3 px-6 text-center">Description</th>
                    <th className="py-3 px-5 text-center">Button</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedExpenses.length > 0 ? (
                    paginatedExpenses.map((expense) => (
                      <tr key={expense._id} className="border-b">
                        <td className="py-4 px-6">{expense.subject}</td>
                        <td className="py-4 px-2 text-center">
                          {format(new Date(expense.date), "MMM dd, yyyy")}
                        </td>
                        <td className="py-4 px-3 text-center">
                          {expense.category}
                        </td>
                        <td className="py-4 px-6 text-center">
                          Rp{expense.total}
                        </td>
                        <td className="py-4 px-2 text-center">
                          {expense.payment_method}
                        </td>
                        <td className="py-4 px-3 text-center">
                          {expense.reimbuse ? "Yes" : "No"}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {expense.description}
                        </td>
                        <td className="flex flex-col justify-between py-[0.4vw] px-[0.4vw] font-bold">
                          <Link
                            href="/EditExpenses"
                            className="mb-[0.2vw] bg-[#22B78680] text-center"
                          >
                            Edit
                          </Link>
                          <button
                            className="bg-[#FF8C8C]"
                            onClick={() => handleDeleteExpense(expense._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-4 px-6">
                        No expenses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-6">
              <button
                className="px-4 py-2 bg-white text-black rounded-[0.221vw] hover:bg-gray-100 border border-[#22B786]"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-4 text-2xl px-[1.5vw] py-[0.2vw] bg-[#22B786] rounded-[0.221vw] text-white">
                {currentPage}
              </span>
              <button
                className="px-7 py-2 bg-white text-black rounded-[0.221vw] hover:bg-gray-100 border border-[#22B786]"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage * expensesPerPage >= filteredExpenses.length
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesPage;
