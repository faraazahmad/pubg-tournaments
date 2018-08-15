// Use this file to add events to HTML elements rather than specifying in the HTML file.
function addEvent(selector, func) {
    $(selector).addEventListener('load', func());
}

// sign in through firebase when on registrations page
addEvent("#registrations-page", signIn);

// put user name and pic on .navbar when it loads
addEvent('.navbar', getUserData);