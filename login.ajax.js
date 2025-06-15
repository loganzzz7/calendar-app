// ajax.js
function loginAjax(event) {

    const username = document.getElementById("user").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };

    fetch("login_ajax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success == true) {
                sessionStorage.setItem("currentUserID", data.user_id);
                sessionStorage.setItem("currentUser", data.user);
                sessionStorage.setItem("currentCSRFToken", data.token);
                showWelcome();
                showCreate();
                showFilters();
                updateCalendar();
                message.innerHTML = '<p id="message" class="alertSuccess"> You\'ve logged in. </p>'
            } else {
                message.innerHTML = '<p id="message" class="alertFail"> Wrong username or password. Please re-enter. </p>'
            }
        })
        .catch(err => console.error(err));
}


function signupAjax(event) {

    const username = document.getElementById("user").value; // Get the username from the form
    const password1 = document.getElementById("password1").value; // Get the first password from the form
    const password2 = document.getElementById("password2").value; // Get the second password from the form

    if (password1 != password2) {
        message.innerHTML = '<p id="message" class="alertFail"> The passwords don\'t match. Please re-type. </p>';
        console.log("Passwords don't match");
        return;
    }

    const regex1 = new RegExp(/^[\w_\-]+$/);
    const match1 = regex1.exec(username);
    const match2 = regex1.exec(password1);

    if (match1 == null || match2 == null) {
        message.innerHTML = '<p id="message" class="alertFail"> The username or password is invalid. Please re-type. </p>';
        console.log("Invalid name or password.");
        return;
    }

    const data = { 'username': username, 'password': password1 };

    fetch("signup_ajax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => data.success ? message.innerHTML = '<p id="message" class="alertSuccess"> User created! </p>' : message.innerHTML = '<p id="message" class="alertFail"> The username is already in use. Please re-type. </p>')
        //.then(data => console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`))
        .catch(err => console.error(err));
}

function logoutAjax() {

    sessionStorage.clear();
    showLogin();
    form2.innerHTML = "";
    form4.innerHTML = "";
    updateCalendar();
    message.innerHTML = '<p id="message" class="alertFail"> You\'ve logged out. </p>';

}

