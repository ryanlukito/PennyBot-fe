"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/app/components/NavBar";
import "tailwindcss/tailwind.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format, addMonths, subMonths, addDays, startOfMonth } from "date-fns";
// import Link from "next/link";
import { getExpenseDetail } from "@/app/connections/connectToDB";

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
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [detailSummary, setDetailSummary] = useState<Expense | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [date, setDate] = useState<{ from?: Date; to?: Date }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonthFrom, setCurrentMonthFrom] = useState(new Date());
  const [currentMonthTo, setCurrentMonthTo] = useState(
    addMonths(new Date(), 1)
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExpenseDetail();
      setDetailSummary(data);
      setExpenses(data);
    };
    fetchData();
  }, []);

  console.log(detailSummary);
  console.log(expenses);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
                <button
                  onClick={() => handleCategoryClick("all")}
                  className="px-4 py-2 bg-blue-200 rounded-full"
                >
                  All
                </button>
                <button
                  onClick={() => handleCategoryClick("Food")}
                  className="px-4 py-2 bg-blue-200 rounded-full"
                >
                  Food
                </button>
                <button
                  onClick={() => handleCategoryClick("Transport")}
                  className="px-4 py-2 bg-blue-200 rounded-full"
                >
                  Transport
                </button>
              </div>
            </div>

            {/* Expense Table */}
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td className="px-4 py-2">{expense.subject}</td>
                    <td className="px-4 py-2">{expense.date}</td>
                    <td className="px-4 py-2">{expense.category}</td>
                    <td className="px-4 py-2">{expense.total}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteExpense(expense._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                disabled={paginatedExpenses.length < expensesPerPage}
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
