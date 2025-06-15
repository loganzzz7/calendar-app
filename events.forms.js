function showCreate() {

    let code = [];

    code.push(
        '<label> Title: &nbsp; <input type="text" id="title"></label>\n',
        '<label> Date: &nbsp; <input type="date" id="date"></label>\n',
        '<label> Time: &nbsp; <input type="time" step="1" id="time"></label>\n',
        '<label> Make Favorite: &nbsp; <input type="checkbox" id="favorite"></label>',
        '<button type="button" id="create-button"> Create </button>\n'
    );

    form2.innerHTML = code.join("");

    let createButton = document.getElementById("create-button");
    createButton.addEventListener("click", addEvent, false);

}

function showModal(eventID) {
    let changeEventModal = document.getElementById("changeEventModal");

    changeEventModal.style.display = "block";

    document.getElementsByClassName("closeBtn")[0].onclick = function () {
        changeEventModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == changeEventModal) {
            changeEventModal.style.display = "none";
        }
    }

    for (let key in events) {
        if (events.hasOwnProperty(key)) {
            let event = events[key];
            if (event.event_id == eventID) {

                let code = [];

                code.push(
                    '<label> Title: &nbsp; <input type="text" id="modal-title" value="',
                    event.title,
                    '"></label>\n',
                    '<label> Date: &nbsp; <input type="date" id="modal-date" value="',
                    event.date,
                    '"></label>\n',
                    '<label> Time: &nbsp; <input type="time" step="1" id="modal-time" value="',
                    event.time,
                    '"></label>\n',
                    '<label> Favorite: &nbsp; <input type="checkbox" id="modal-favorite"></label>\n',
                    '<input type="hidden" id="modal-eventID" value="',
                    event.event_id,
                    '">',
                    '<br>\n',
                    '<button type="button" id="edit-button"> Edit </button>\n',
                    '<button type="button" id="delete-button"> Delete </button>\n'
                );

                form3.innerHTML = code.join("");

                let favoriteBox = document.getElementById("modal-favorite");

                if (event.favorite == 1) {
                    favoriteBox.checked = true;
                } else {
                    favoriteBox.checked = false;
                }

                let editButton = document.getElementById("edit-button");
                editButton.addEventListener("click", editEvent, false);
                editButton.addEventListener("click", function() {
                    changeEventModal.style.display = "none";
                }, false);

                let deleteButton = document.getElementById("delete-button");
                deleteButton.addEventListener("click", deleteEvent, false);
                deleteButton.addEventListener("click", function() {
                    changeEventModal.style.display = "none";
                }, false);

            }
        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calendar-body').addEventListener('click', function (e) {
        if (e.target && e.target.id.startsWith('eventBtn-')) {
            let eventID = e.target.id.split('-')[1]; //gets the event id
            showModal(eventID);
        }
    })
})



// function showLogin() {

//     let code = [];

//     code.push(
//         '<label> Username: &nbsp; <input type="text" id="user"></label>\n',
//         '<label> Password: &nbsp; <input type="password" id="password"></label>\n',
//         '<br>\n',
//         '<button type="button" id="login-button"> Login </button>\n',
//         '<br>\n',
//         '<div class="link navlink">\n',
//         '<a id="signup-navigation"> Sign Up </a>\n',
//         '</div>\n'
//     );

//     form1.innerHTML = code.join("");

//     let loginButton = document.getElementById("login-button");
//     loginButton.addEventListener("click", loginAjax, false);

//     let signupLink = document.getElementById("signup-navigation");
//     signupLink.addEventListener("click", showSignup, false);

// }
