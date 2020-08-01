import React from "react";
import CalendarGridCell from "./CalendarGridCell";
import MomentHelper from "../utils/MomentHelper";

const CalendarGrid = ({ momentHelper }) => {
	const { month, year, daysInMonth, endOfMonth, momentInstance } = momentHelper;

	const isToday = (date, month, year) => {
		const today = new Date();
		const currentDate = new Date(year, month, date);
		return currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
	};

	const isWeekEnd = (date) => {
		// var isWeekend = yourDateObject.getDay()%6==0;
		return true;
	};

	const onGridCellSelect = (selectedDate) => {
		// day value in numeric
		console.log("selected date is : ", selectedDate);
	};

	const getPrevMonthDates = () => {
		let momentHelperPrev = new MomentHelper(momentInstance.clone().subtract(1, "months"));
		const endDate = +momentHelperPrev.endOfMonth();
		let result = [];
		if (endDate < 6) {
			const noOfDays = momentHelperPrev.daysInMonth();
			const startDay = noOfDays - endDate;
			for (let date = startDay; date <= noOfDays; date++) {
				result.push(<CalendarGridCell key={"p" + date} label={date} selectClass="disable" />);
			}
		}
		return result;
	};

	const getNextMonthDates = () => {
		let nextMonthDates = [];
		const endOfMonthDay = +endOfMonth();
		if (endOfMonthDay < 6) {
			const noOfFutureDates = 6 - endOfMonthDay;
			for (let date = 1; date <= noOfFutureDates; date++) {
				nextMonthDates.push(<CalendarGridCell key={"n" + date} label={date} selectClass="disable" />);
			}
		}
		return nextMonthDates;
	};

	const monthDays = () => {
		let days = [];
		const selectedMonth = month();
		const selectedYear = year();
		for (let date = 1; date <= daysInMonth(); date++) {
			days.push(
				<CalendarGridCell selectClass={isToday(date, selectedMonth, selectedYear) ? "selected" : ""} key={date} label={date} onGridCellSelect={onGridCellSelect} isWeekEnd={isWeekEnd(date)} />
			);
		}
		return days;
	};

	const gridCells = () => {
		const rows = [];
		const totalDays = [...getPrevMonthDates(), ...monthDays(), ...getNextMonthDates()];
		const noOfRows = Math.ceil(totalDays.length / 7);
		let count = 0;
		for (let i = 0; i < noOfRows; i++) {
			const newRow = totalDays.slice(count, count + 7);
			rows.push(newRow);
			count = count + 7;
		}
		return rows;
	};

	const renderRows = () => {
		return gridCells().map((row, index) => {
			return (
				<div className="grid-row" key={index}>
					{Array.from(row)}
				</div>
			);
		});
	};

	return <div>{renderRows()} </div>;
};

export default CalendarGrid;
