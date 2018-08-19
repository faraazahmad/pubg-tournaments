// Initialize Firebase
var config = {
    /* IMPORTANT: Use only as environment variable */
    apiKey: "AIzaSyASHadNA5KCvdl-GTXRbDJuEBLryuhdX04",
    authDomain: "pubg-tournament.firebaseapp.com",
    databaseURL: "https://pubg-tournament.firebaseio.com",
    projectId: "pubg-tournament",
    storageBucket: "",
    messagingSenderId: "568585129544"
};
firebase.initializeApp(config);

// Auth stuff
let provider = new firebase.auth.GoogleAuthProvider();

function signIn() {
    // check if user is signed in
    let user = getCurrentUser();
    if (user) {
        // show user's display name on navbar
        getUserData()

        // get data of all registrations
        getRegistrations();
    }
    else {
        
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // signed in
            getUserData();

            // get all the registrations
            getRegistrations();
        }
        else {
            //  not signed in; sign in
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function () {
                    // session will be stored locally and an expilicit sign out is required
                    // to sign out
                    return firebase.auth().signInWithPopup(provider);
                })
                .catch(function (error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;

                    alert("Error signing in" + errorMessage + " " + errorCode);
                });
        }
    });
}

// Firestore stuff
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

function signUp() {
    // check for errors
    let username = document.querySelector('[name="username"]').value;
    if (username == "") {
        alert("Username can't be empty!");
        return;
    }
    let teamMates = document.querySelector('[name="teammates"]').value;
    let email = document.querySelector('[name="email"]').value;
    if (email == "") {
        alert("Email can't be empty!");
        return;
    }
    let instaID = document.querySelector('[name="insta"]').value;
    if (instaID == "") {
        alert("Instagram ID can't be empty!");
        return;
    }
    let phone = document.querySelector('[name="phone"]').value;
    if (phone == "") {
        alert("Phone number can't be empty!");
        return;
    }
    let payPhone = document.querySelector('[name="payphone"]').value;
    if (payPhone == "") {
        alert("Payment phone number can't be empty!");
        return;
    }
    let screenshotLink = document.querySelector('[name="screenshot"]').value;
    if (screenshotLink == "") {
        alert("Screenshot link can't be empty!");
        return;
    }
    let squadCheckbox = document.querySelector('[name="squad-checkbox"]').checked;
    let soloCheckbox = document.querySelector('[name="solo-checkbox"]').checked;
    let modes = new Array;
    let squad = new Array;

    if (squadCheckbox) {
        modes.push("squad");
        squad = teamMates.split(",");
    }
    if (soloCheckbox) {
        modes.push("solo");
    }

    let data = {
        username: username,
        email: email,
        instaID: instaID,
        phone: phone,
        payPhone: payPhone,
        screenshotLink: screenshotLink,
        modes: modes,
        squad: squad,
    };

    // if everything is okay
    firestore.collection("users").add(data)
        .then(function () {
            window.location.replace('/')
            .then(() => {
                alert('Registration succesful.');
            });
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

    // window.location.replace('/');
}

async function getRegistrations() {
    if(userIsAdmin()) {
        let records = [];
        
        // wait for data to arrive from database
        await firestore.collection("users").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                records.push(doc.data());
            });
        });
        
        let usersList = $('#users-list');
        records.forEach((user) => {
            usersList.appendChild(createRow(user));
        });
    }
}

function userIsAdmin() {
    let currentUser = getCurrentUser();
    if(currentUser != null && admins.includes(currentUser.email))
        return true;
    else
        return false;
}

function getCurrentUser() {
    return firebase.auth().currentUser;
}