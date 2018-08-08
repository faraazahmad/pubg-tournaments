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
        teamMates: teamMates,
        email: email,
        instaID: instaID,
        phone: phone,
        payPhone: payPhone,
        screenshotLink: screenshotLink,
        modes: modes,
        squad: squad
    };

    // if everything is okay
    firestore.collection("users").add(data);
    alert('Registration succesful.');
    // window.location.replace('/');
}