function login() {

    const username =
        document.getElementById(
            "username"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    if(
        username === "admin" &&
        password === "admin123"
    ) {
        sessionStorage.setItem(
            "loggedIn",
            "true"
        );
        window.location.href =
            "index.html";

    } else {

        document.getElementById(
            "error-message"
        ).innerText =
            "Invalid Username or Password";
    }
}
