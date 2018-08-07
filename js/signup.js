firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
})