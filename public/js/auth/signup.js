import { User } from "./User.js";

const signupButton = document.getElementById("signup");

signupButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    
    const user = new User(username, email, password);
    user.signup();
});