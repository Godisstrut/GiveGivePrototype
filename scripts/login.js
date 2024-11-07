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
    } else if (email === premadeUser.email && password != premadeUser.password) {
        alert("Login failed! Password incorrect ")
    } else if (email != premadeUser.email && password === premadeUser.password) {
        alert("Login failed! Email incorrect ")
    } else {
        alert("Login failed! both email and password were incorrect ")
    }
}

