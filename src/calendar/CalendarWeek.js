import React from "react";
import moment from "moment";

const CalendarWeek = () => {
	const weekDays = moment.weekdaysMin();
	const renderWeekDays = () => {
		return weekDays.map((day, i) => {
			return <div key={i}>{day}</div>;
		});
	};
	return <div className="grid-row font-weight-bold">{renderWeekDays()}</div>;
};

export default CalendarWeek;
