// Use this file to add events to HTML elements rather than specifying in the HTML file.
function addEvent(selector, func) {
    let element = $(selector);

    if(element) {
        func();
    }
}


// execute getRegistrations() when on the table on the registrations page loads
addEvent('#users-list', getRegistrations);

// sign in through firebase when on registrations page
addEvent("#registrations-page", signIn);

// put user name and pic on .navbar when it loads
addEvent('.navbar', getUserData);

// add view registrations button on navbar
addEvent('.navbar-start', addViewRegButton);