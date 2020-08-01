import React from "react";

const CalendarGridCell = ({ label, selectClass, onGridCellSelect }) => {
	return label ? (
		<div onClick={(e) => (onGridCellSelect ? onGridCellSelect(label) : null)} className={`cell ${selectClass}`}>
			{label}
		</div>
	) : (
		<div>&nbsp;</div>
	);
};

export default CalendarGridCell;
