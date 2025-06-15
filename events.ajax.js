// ajax.js
async function getEvents(event) {

    const userID = sessionStorage.getItem("currentUserID");
    const month = currentMonthNumber;
    const year = currentYearNumber;

    console.log("events.ajax Start");
    console.log(month);
    console.log(year);

    // const username = document.getElementById("user").value; // Get the username from the form
    // const password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'userID': userID, 'month': month, 'year': year };

    const response = await fetch("show_ajax.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    });

    const eventsJSON = await response.json();

    events = [];
    let counter = 1;

    console.log("getEvents() called");
    console.log("JSON Data");
    console.log(eventsJSON);

    for (let key in eventsJSON) {

        if (eventsJSON.hasOwnProperty(key)) {

            let event = eventsJSON[key];
            let newEvent = {};
            newEvent['event_id'] = event.event_id;
            newEvent['user_id'] = event.user_id;
            newEvent['title'] = event.title;
            newEvent['date'] = event.date;
            newEvent['time'] = event.time;
            newEvent['day'] = event.day;
            newEvent['favorite'] = event.favorite;
            events['event' + counter] = newEvent;
            counter = counter + 1;

        }

    }

    // console.log("Events in getEvents()");
    // console.log(events);

}

async function addEvent(event) {

    const userID = sessionStorage.getItem("currentUserID");
    const token = sessionStorage.getItem("currentCSRFToken");
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const favorite = (document.getElementById("favorite").checked) ? 1 : 0;

    console.log(userID);
    console.log(date);
    console.log(time);
    console.log(title);

    if (title == "") {
        message.innerHTML('<p id="message" class="alertFail"> The title is invalid. Please re-type. </p>');
    }

    const data = { 'userID': userID, 'token': token, 'title': title, 'date': date, 'time': time, 'favorite': favorite }

    const response = await fetch("create_ajax.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    });

    const addJSON = await response.json();

    if (addJSON.success == true) {
        updateCalendar();
        message.innerHTML = '<p id="message" class="alertSuccess"> Your event has been created. </p>';
    }

}

async function editEvent(event) {

    const userID = sessionStorage.getItem("currentUserID");
    const token = sessionStorage.getItem("currentCSRFToken");
    const title = document.getElementById("modal-title").value;
    const date = document.getElementById("modal-date").value;
    const time = document.getElementById("modal-time").value;
    const favorite = (document.getElementById("modal-favorite").checked) ? 1 : 0;
    const eventID = document.getElementById("modal-eventID").value;

    console.log(userID);
    console.log(date);
    console.log(time);
    console.log(title);
    console.log(eventID);

    if (title == "") {
        message.innerHTML('<p id="message" class="alertFail"> The title is invalid. Please re-type. </p>');
    }

    const data = { 'userID': userID, 'token': token, 'title': title, 'date': date, 'time': time, 'favorite': favorite, 'eventID': eventID }

    const response = await fetch("edit_ajax.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    });

    const addJSON = await response.json();

    if (addJSON.success == true) {
        updateCalendar();
        message.innerHTML = '<p id="message" class="alertSuccess"> Your event has been edited. </p>';
    }

}

async function deleteEvent(event) {

    const userID = sessionStorage.getItem("currentUserID");
    const token = sessionStorage.getItem("currentCSRFToken");
    const eventID = document.getElementById("modal-eventID").value;

    console.log(userID);
    console.log(date);
    console.log(time);
    console.log(title);
    console.log(eventID);

    const data = { 'userID': userID, 'token': token, 'eventID': eventID }

    const response = await fetch("delete_ajax.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    });

    const addJSON = await response.json();

    if (addJSON.success == true) {
        updateCalendar();
        message.innerHTML = '<p id="message" class="alertSuccess"> Your event has been deleted. </p>';
    }

}
