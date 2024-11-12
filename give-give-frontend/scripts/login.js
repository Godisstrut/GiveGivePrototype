//Premade user credentials for demo testing
/*const premadeUser = {
    email: "johndoe@gmail.com",
    password: "admin123" 
};

//login function for authentication a user
/*function login() {
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
}*/


let userId;  
async function login() {
    const username = document.getElementById("email").value;

    try {
        const response = await fetch(`http://localhost:3000/api/login?name=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Login failed with status ${response.status}`);
        }

        
        const data = await response.json();
        console.log('Login successful:', data);

        
        userId = data[0].Id; 

       
        localStorage.setItem('userId', userId); 
        console.log(userId)
        console.log(localStorage.getItem('userId'))
        
        window.location.href = 'http://127.0.0.1:5500/give-give-frontend/views/inventory.html';
        
    } catch (error) {
        console.error("Error:", error.message);
    }
}
