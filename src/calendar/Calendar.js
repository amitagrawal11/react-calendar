import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import MomentHelper from "../utils/MomentHelper";
import { generatePath } from "react-router";
import "./Calendar.css";

import { CalendarControls, CalendarWeek, CalendarGrid } from "./index";

const Calendar = (props) => {
	let history = useHistory();
	// getch year and month from url
	let params = history.location.pathname.split("/").splice(1, 2); // since blank
	const [year, month] = params;
	let momentInstance = moment();

	if (year && month && year.length === 4 && +month >= 0 && +month < 12) {
		momentInstance = moment()
			.month(+month)
			.year(+year);
	} else if (month && year) {
		console.log("Invalid date so setting current date");
		history.replace({ pathname: "/" });
	}

	const [momentHelper, setMomentHelper] = useState(new MomentHelper(momentInstance));

	const setCurrentDatePath = (momentHelper) => {
		const path = generatePath("/:year/:month", {
			month: momentHelper.month(),
			year: momentHelper.year(),
		});
		history.replace({ pathname: path });
	};

	const onControlsChange = (momentHelperInstance) => {
		// set path
		setCurrentDatePath(momentHelperInstance);

		// console.log("lets notice when date changes ", window.history);
		setMomentHelper(momentHelperInstance);
	};

	return (
		<div className="calendar-container my-5 pb-3">
			<CalendarControls onControlsChange={onControlsChange} currMonth={momentHelper.month()} currYear={momentHelper.year()} />
			<CalendarWeek />
			<CalendarGrid momentHelper={momentHelper} />
		</div>
	);
};

export default Calendar;
