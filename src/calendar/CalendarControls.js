import React, { useState } from "react";
import moment from "moment";
import MomentHelper from "../utils/MomentHelper";

const CalendarControls = ({ onControlsChange, currMonth, currYear }) => {
	const monthList = moment.months();
	const yearList = () => {
		let years = [];
		for (let i = 1990; i <= 2030; i++) {
			years.push(i);
		}
		return years;
	};
	const [momentHelper, setMomentHelper] = useState(
		new MomentHelper(
			moment()
				.month(+currMonth)
				.year(+currYear)
		)
	);
	const onMonthOrYearChange = (month, year) => {
		const momentInstance = moment().month(month).year(year);
		const momentHelper = new MomentHelper(momentInstance);
		setMomentHelper(momentHelper);
		onControlsChange(momentHelper);
	};

	const onMonthMove = (step) => {
		if (typeof step === "number") {
			if (step >= 0) {
				momentHelper.addMonth();
			} else {
				momentHelper.substractMonth();
			}
			onMonthOrYearChange(momentHelper.month(), momentHelper.year());
		}
	};
	const onYearMove = (step) => {
		if (typeof step === "number") {
			if (step >= 0) {
				momentHelper.addYear();
			} else {
				momentHelper.substractYear();
			}
			onMonthOrYearChange(momentHelper.month(), momentHelper.year());
		}
	};
	const { month, year } = momentHelper;

	return (
		<div className="d-flex justify-content-between m-2 grid-controls py-3">
			<div className="nav ml-2 py-2" onClick={(e) => onYearMove(-1)}>
				<i className="fa fa-angle-double-left" aria-hidden="true" />
			</div>
			<div className="nav py-2" onClick={(e) => onMonthMove(-1)}>
				<i className="fa fa-angle-left" aria-hidden="true" />
			</div>
			<div className="d-flex align-items-center">
				<select name="months" value={month()} onChange={(e) => onMonthOrYearChange(e.target.value, year())}>
					{monthList.map((month, index) => (
						<option key={index} value={index}>
							{month}
						</option>
					))}
				</select>
				, &nbsp;
				<select name="years" value={year()} onChange={(e) => onMonthOrYearChange(month(), e.target.value)}>
					{yearList().map((year, index) => (
						<option key={index} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
			<div className="nav py-2" onClick={(e) => onMonthMove(1)}>
				<i className="fa fa-angle-right" aria-hidden="true" />
			</div>
			<div className="nav mr-2 py-2" onClick={(e) => onYearMove(1)}>
				<i className="fa fa-angle-double-right" aria-hidden="true" />
			</div>
		</div>
	);
};

export default CalendarControls;
