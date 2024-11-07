//Premade user credentials for demo testing
const premadeUser = {
    email: "johndoe@gmail.com",
    password: "admin123" 
};

//login function for authentication a user
function login() {
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;

    if (email === premadeUser.email && password === premadeUser.password) {
        alert("Login was complete! ")
    } else {
        alert("Password or email was invalid! ")
    }
}

