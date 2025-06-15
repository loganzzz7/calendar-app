document.addEventListener("DOMContentLoaded", loadPage, false);

function loadPage() {

    let token = sessionStorage.getItem("currentCSRFToken");

    if (token != null) {
        showWelcome();
        showCreate();
        showFilters();
        updateCalendar();
    } else {
        showLogin();
        form2.innerHTML = "";
        form4.innerHTML = "";
        updateCalendar();
    }

}
