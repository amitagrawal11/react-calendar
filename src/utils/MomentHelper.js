export default function MomentHelper(momentInstance) {
	this.momentInstance = momentInstance;
	this.year = () => momentInstance.clone().format("Y");
	this.month = () => momentInstance.clone().month();
	this.setMonth = (month) => momentInstance.month(month);
	this.setYear = (year) => momentInstance.year(year);
	this.monthName = () => momentInstance.format("MMMM");
	this.daysInMonth = () => momentInstance.daysInMonth();
	this.currentDate = () => momentInstance.get("date");
	this.currentDay = () => momentInstance.format("D");
	this.firstDayOfMonth = () => momentInstance.clone().startOf("month").format("d");
	this.endOfMonth = () => momentInstance.clone().endOf("month").format("d");
	this.addMonth = () => momentInstance.add(1, "months");
	this.substractMonth = () => momentInstance.subtract(1, "months");
	this.addYear = () => momentInstance.add(1, "years");
	this.substractYear = () => momentInstance.subtract(1, "years");
}
