// For our purposes, we can keep the current month in a variable in the global scope
// let currentMonth = new Month(2023, 9); // October 2023
const currentDate = new Date();
let currentMonthNumber = currentDate.getMonth() + 1;
let currentMonthName = getMonthName(currentMonthNumber);
let currentMonth = new Month(currentDate.getFullYear(), currentDate.getMonth());
let currentYearNumber = currentDate.getFullYear();
// console.log(currentYearNumber);

// document.addEventListener("DOMContentLoaded", updateCalendar, false);

// Change the month when the "next" button is pressed
document.getElementById("next-month-button").addEventListener("click", function (event) {
    currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar("next"); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    //alert("The new month is " + currentMonth.month + " " + currentMonth.year);
}, false);


// Change the month when the "previous" button is pressed
document.getElementById("previous-month-button").addEventListener("click", function (event) {
    currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar("previous"); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    //alert("The new month is " + currentMonth.month + " " + currentMonth.year);
}, false);


// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
async function updateCalendar(mode) {

    console.log("Update Calendar called");
    console.log(currentMonthNumber);

    const calendarMonth = document.getElementById("month-name");
    const calendarTable = document.getElementById("calendar-body");

    if (mode === "next") {
        if (currentMonthNumber === 12) {
            currentMonthNumber = 1;
            currentYearNumber = currentYearNumber + 1;
        } else {
            currentMonthNumber = currentMonthNumber + 1;
        }
        currentMonthName = getMonthName(currentMonthNumber);
    } else if (mode === "previous") {
        if (currentMonthNumber === 1) {
            currentMonthNumber = 12;
            currentYearNumber = currentYearNumber - 1;
        } else {
            currentMonthNumber = currentMonthNumber - 1;
        }
        currentMonthName = getMonthName(currentMonthNumber);
    }

    console.log(currentMonthNumber);
    console.log(currentYearNumber);

    await getEvents();

    console.log("Printing events array");
    console.log(events);

    let weeks = currentMonth.getWeeks();

    calendarTable.innerHTML = "";

    calendarCode = "";

    for (let w in weeks) {

        let days = weeks[w].getDates();
        // days contains normal JavaScript Date objects.

        calendarCode = calendarCode + "<tr>\n";

        //alert("Week starting on " + days[0]);

        // let eventsButtons = [];

        for (let d in days) {

            const dayString = days[d].toString();
            const regex = new RegExp(/[\w]{3} ([\w]{3}) ([\d]{2}) ([\d]{4}) [\d]{2}:[\d]{2}:[\d]{2} GMT-[\d]{4} \([\wáéíóú ]+\)/);
            const match = regex.exec(dayString);
            const month = match[1];
            const day = match[2];
            const year = match[3];

            calendarCode = calendarCode + "<td>";

            if (currentMonthName === month && currentYearNumber == year) {

                calendarCode = calendarCode + " " + day + " ";

                for (let key in events) {
                    if (events.hasOwnProperty(key)) {
                        let event = events[key];

                        if (event.day == day) {

                            if (favorites == 0) {

                                if (event.favorite == 0 && event.title.includes(search)) {

                                    calendarCode = calendarCode + ['<button class="eventBtn" id="eventBtn-', event.event_id, '" type="button">'].join("");
                                    calendarCode = calendarCode + ' ' + event.title + ' ';
                                    calendarCode = calendarCode + ' ' + event.time + ' ';
                                    calendarCode = calendarCode + '</button>\n';

                                } else if (event.favorite == 1 && event.title.includes(search)) {

                                    calendarCode = calendarCode + '<div class="favorites">';
                                    calendarCode = calendarCode + ['<button class="eventBtn" id="eventBtn-', event.event_id, '" type="button">'].join("");
                                    calendarCode = calendarCode + ' ' + event.title + ' ';
                                    calendarCode = calendarCode + ' ' + event.time + ' ';
                                    calendarCode = calendarCode + '</button>\n';
                                    calendarCode = calendarCode + '</div>\n';

                                }

                            } else if (favorites == 1) {

                                if (event.favorite == 1 && event.title.includes(search)) {

                                    calendarCode = calendarCode + '<div class="favorites">';
                                    calendarCode = calendarCode + ['<button class="eventBtn" id="eventBtn-', event.event_id, '" type="button">'].join("");
                                    calendarCode = calendarCode + ' ' + event.title + ' ';
                                    calendarCode = calendarCode + ' ' + event.time + ' ';
                                    calendarCode = calendarCode + '</button>\n';
                                    calendarCode = calendarCode + '</div>\n';

                                }

                            }

                        }
                    }
                }

            }

            calendarCode = calendarCode + "</td>\n";

            // You can see console.log() output in your JavaScript debugging tool, like Firebug,
            // WebWit Inspector, or Dragonfly.
            //console.log(days[d].toISOString());
        }

        calendarCode = calendarCode + "</tr>\n";

    }

    calendarTable.innerHTML = calendarCode;
    calendarMonth.innerHTML = currentMonthName + " " + currentMonth.year;

}

function getMonthName(monthNumber) {

    switch (monthNumber) {

        case 1:
            return "Jan";

        case 2:
            return "Feb";

        case 3:
            return "Mar";

        case 4:
            return "Apr";

        case 5:
            return "May";

        case 6:
            return "Jun";

        case 7:
            return "Jul";

        case 8:
            return "Aug";

        case 9:
            return "Sep";

        case 10:
            return "Oct";

        case 11:
            return "Nov";

        case 12:
            return "Dec";
    }

}
