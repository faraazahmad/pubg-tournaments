document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});

// create and return a div for listing registrations page
function createRow(userObject) {
    let row = document.createElement('tr');
    // div.id = 'user-item';

    let td;
    let keys = [
        'username',
        'email',
        'instaID',
        'modes',
        'phone',
        'payPhone',
        'screenshotLink',
        'squad'
    ];
    
    keys.forEach((key) => {
        td = document.createElement('td');
        // create a tag with link
        if(key == 'screenshotLink') {
            let a = document.createElement('a');
            a.href = userObject[key];
            // add link icon to a tag
            let i = document.createElement('i');
            i.className += 'fas fa-link';
            a.appendChild(i);
            // append a tag to row
            td.appendChild(a);
        }
        else {
            if(userObject[key] == '')
            td.innerHTML = '-';
            else {
                td.innerHTML = userObject[key] ;
            }
        }
        row.appendChild(td);
    });

    return row;
}

// When user is logged in, add profile name and pic in navbar
function getUserData() {
    let user = firebase.auth().currentUser;
    if (user != null) {
        $('#user-name').innerHTML = user.displayName;
    }
}