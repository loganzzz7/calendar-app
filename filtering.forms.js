function showFilters() {

    let code = [];

    code.push(
        '<label> See Favorites: &nbsp; <input type="checkbox" id="favorites"></label>',
        '<label> Search: &nbsp; <input type="text" id="search"></label>'
    );

    form4.innerHTML = code.join("");

    let favoritesBox = document.getElementById("favorites");
    favoritesBox.addEventListener("click", function () {
        favorites = (favoritesBox.checked) ? 1 : 0;
        updateCalendar();
    }, false);

    let searchBox = document.getElementById("search");
    searchBox.addEventListener("keyup", function () {
        search = searchBox.value;
        updateCalendar();
    }, false);

    // let createButton = document.getElementById("create-button");
    // createButton.addEventListener("click", addEvent, false);

}