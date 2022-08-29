class Auth {
    constructor() {
        document.querySelector("body").style.display = "none";
        const authA = localStorage.getItem("myToken"),
            authS = sessionStorage.getItem("myToken");
        let auth = false;
        if (authA) {
            auth = authA;
        } else if (authS) {
            auth = authS;
        }
        this.validateAuth(auth);
    }

    validateAuth(auth) {
        if (!auth) {
            window.location.replace("index.html");
        } else {

            document.querySelector("body").style.display = "block";
        }
    }

    logOut() {
        localStorage.removeItem("myToken");
        sessionStorage.removeItem("myToken");
        localStorage.removeItem("myId");
        window.location.replace("index.html");
    }
}