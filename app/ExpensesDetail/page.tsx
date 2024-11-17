'use client';
import React from "react";
import NavBar from "../components/NavBar";
import "tailwindcss/tailwind.css";
import { format, addMonths, subMonths, startOfMonth, addDays } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";

interface DateRange {
  from?: Date;
  to?: Date;
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonthFrom, setCurrentMonthFrom] = React.useState(new Date());
  const [currentMonthTo, setCurrentMonthTo] = React.useState(
    addMonths(new Date(), 1)
  );

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const togglePopover = () => setIsOpen(!isOpen);

  const handleDateClick = (day: Date) => {
    if (!date.from || (date.from && date.to)) {
      setDate({ from: day });
    } else {
      setDate({ from: date.from, to: day });
    }
  };

  const renderDays = (month: Date) => {
    const startDate = startOfMonth(month);
    const daysInMonth = Array.from({ length: 42 }).map((_, index) =>
      addDays(startDate, index - startDate.getDay())
    );

    return daysInMonth.map((day, index) => {
      const isSelected =
        (date.from &&
          format(day, "yyyy-MM-dd") === format(date.from, "yyyy-MM-dd")) ||
        (date.to && format(day, "yyyy-MM-dd") === format(date.to, "yyyy-MM-dd"));
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

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={togglePopover}
        className="w-[270px] flex items-center gap-2 px-4 py-2 border rounded-xl shadow-md bg-white hover:bg-gray-100 focus:ring focus:ring-blue-300"
      >
        <FaCalendarAlt className="w-5 h-5 text-gray-500" />
        {date?.from ? (
          date.to ? (
            `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
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
            {/* Navigasi Bulan Kalender Awal */}
            <div className="flex flex-col items-center">
              <h1>Start Date</h1>
              <div className="flex justify-between items-center">
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setCurrentMonthFrom(subMonths(currentMonthFrom, 1))}
                >
                  {"<"}
                </button>
                <span className="px-4">
                  {format(currentMonthFrom, "MMMM yyyy")}
                </span>
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setCurrentMonthFrom(addMonths(currentMonthFrom, 1))}
                >
                  {">"}
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mt-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {renderDays(currentMonthFrom)}
              </div>
            </div>

            {/* Navigasi Bulan Kalender Akhir */}
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
                  <div key={day} className="text-center font-medium text-gray-500">
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
              onClick={() => setDate({ from: undefined, to: undefined })}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



const page = () => {
  return (
    <>
      <div className="bg-[#E2ECEA] w-screen h-screen text-black flex flex-start items-start">
        <NavBar />
        <div className="mx-7  w-screen">
          <div className="container mx-auto py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#575252]">Expenses Detail</h1>
              <DatePickerWithRange />
            </div>

            {/* Search and Buttons */}
            <div className="flex">
              <div className="flex items-center bg-white border border-gray-300 shadow-lg rounded-xl px-4 h-10 mr-5 w-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Search"
                  className="bg-white text-gray-700 text-sm focus:outline-none w-full"
                />
              </div>

              <div className="flex justify-between w-full space-x-2 mb-6">
                <button className="bg-[#CBFDB0] hover:bg-[#A7FF77] w-32 text-black px-4 py-2 shadow-lg rounded-xl"><strong>Food</strong></button>
                <button className="bg-[#FCFFB9] hover:bg-[#F8FF6F] w-32 text-black px-4 py-2 shadow-lg rounded-xl"><strong>Groceries</strong></button>
                <button className="bg-[#99E3EB] hover:bg-[#71DFEC] w-32 text-black px-4 py-2 shadow-lg rounded-xl"><strong>Health</strong></button>
                <button className="bg-[#F5A0A0] hover:bg-[#ED7A7A] w-32 text-black px-4 py-2 shadow-lg rounded-xl"><strong>Electricity</strong></button>
                <button className="bg-[#FBCE7A] hover:bg-[#FDC358] w-36 text-black px-4 py-2 shadow-lg rounded-xl"><strong>Transportation</strong></button>
                <button className="bg-[#DBB2FF] hover:bg-[#C587FC] w-36 text-black px-4 py-2 shadow-lg rounded-xl"><strong>Entertainment</strong></button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-[#22B786] text-black text-center uppercase text-sm ">
                    <th className="py-3 px-6">Subject</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">Total</th>
                    <th className="py-3 px-6">Payment Method</th>
                    <th className="py-3 px-6">Reimbursable</th>
                    <th className="py-3 px-6">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  <tr className="border-b">
                    <td className="py-3 px-6"><strong>Lunch</strong><br />Subway</td>
                    <td className="py-3 px-6 text-center">06/01/2017</td>
                    <td className="py-3 px-6 text-center">Food</td>
                    <td className="py-3 px-6 text-center">Rp65,000.00</td>
                    <td className="py-3 px-6 text-center">Debit Card</td>
                    <td className="py-3 px-6 text-center">-</td>
                    <td className="py-3 px-6 text-center">-</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-6"><strong>Subscription</strong><br />Netflix</td>
                    <td className="py-3 px-6 text-center">06/11/2017</td>
                    <td className="py-3 px-6 text-center">Entertainment</td>
                    <td className="py-3 px-6 text-center">Rp120,000.00</td>
                    <td className="py-3 px-6 text-center">Virtual Account</td>
                    <td className="py-3 px-6 text-center">-</td>
                    <td className="py-3 px-6 text-center">-</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-6"><strong>Coffee for Team</strong><br />Fore</td>
                    <td className="py-3 px-6 text-center">06/13/2017</td>
                    <td className="py-3 px-6 text-center">Food</td>
                    <td className="py-3 px-6 text-center">Rp180,000.00</td>
                    <td className="py-3 px-6 text-center">QRIS</td>
                    <td className="py-3 px-6 text-center">Yes</td>
                    <td className="py-3 px-6 text-center">Will be reimbursed on June 30</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-[#22B786]">Showing 1 to 6 of 6 entries</span>
              <div className="flex space-x-2">
                <button className="border-2 border-[#22B786] hover:bg-[#22B786] text-gray-700 px-3 py-1 rounded-lg">Previous</button>
                <button className="border-2 border-[#22B786] hover:bg-[#22B786] text-gray-700 px-3 py-1 rounded-lg">1</button>
                <button className="border-2 border-[#22B786] hover:bg-[#22B786] text-gray-700 px-3 py-1 rounded-lg">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;