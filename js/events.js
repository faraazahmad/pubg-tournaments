// Use this file to add events to HTML elements rather than specifying in the HTML file.

// execute getRegistrations() when on the table on the registrations page loads
$("#users-list").addEventListener("load", getRegistrations());

// sign in through firebase when on registrations page
$("#registrations-page").addEventListener("load", signIn());

// put user name and pic on .navbar when it loads
$('.navbar').addEventListener("load", getUserData());