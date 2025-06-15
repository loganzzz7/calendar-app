function showLogin() {

    let code = [];

    code.push(
        '<label> Username: &nbsp; <input type="text" id="user"></label>\n',
        '<label> Password: &nbsp; <input type="password" id="password"></label>\n',
        '<br>\n',
        '<button type="button" id="login-button"> Login </button>\n',
        '<br>\n',
        '<div class="link navlink">\n',
        '<a id="signup-navigation"> Sign Up </a>\n',
        '</div>\n'
    );

    form1.innerHTML = code.join("");

    let loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", loginAjax, false);

    let signupLink = document.getElementById("signup-navigation");
    signupLink.addEventListener("click", showSignup, false);

}

function showSignup() {

    let code = [];

    code.push(
        '<label> Username: &nbsp; <input type="text" id="user"></label>\n',
        '<label> Password: &nbsp; <input type="password" id="password1"></label>\n',
        '<label> Confirm Password: &nbsp; <input type="password" id="password2"></label>\n',
        '<br>\n',
        '<button type="button" id="signup-button"> Sign Up </button>\n',
        '<br>\n',
        '<div class="link navlink">\n',
        '<a id="login-navigation"> Go back to login </a>\n',
        '</div>\n'
    );

    form1.innerHTML = code.join("");

    let signupButton = document.getElementById("signup-button");
    signupButton.addEventListener("click", signupAjax, false);

    let loginLink = document.getElementById("login-navigation");
    loginLink.addEventListener("click", showLogin, false);

}

function showWelcome() {

    let currentUser = sessionStorage.getItem("currentUser");

    let code = [];

    code.push(
        '<h2> Welcome ' + currentUser + '! </h2>\n',
        '<br>\n',
        '<button type="button" id="logout-button"> Logout </button>\n'
    );

    form1.innerHTML = code.join("");

    let logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", logoutAjax, false);

}
