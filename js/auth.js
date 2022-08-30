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
        let self = this;
        if (!auth) {
            window.location.replace("index.html");
        } else {
            fetch('api/auth?' + new URLSearchParams({
                    token: auth,
                    id: localStorage.getItem("myId")
                }), {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer'
                }).then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.error) {
                        self.logOut();
                    } else {
                        document.querySelector("body").style.display = "block";
                        self.include('js/nod.js');
                        self.include('js/pagination.js');
                        self.include('js/students.js');
                        self.include('js/initfooter.js');
                    }

                });

        }
    }

    include(url) {
        let script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('body')[0].appendChild(script);
    }

    logOut() {

        const authA = localStorage.getItem("myToken"),
            authS = sessionStorage.getItem("myToken");
        let auth = false;
        if (authA) {
            auth = authA;
        } else if (authS) {
            auth = authS;
        }

        let data = {
            id: localStorage.getItem("myId"),
            token: auth
        };


        fetch('api/auth', {
                method: 'DELETE',
                body: JSON.stringify(data),
                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.text)
                } else {
                    localStorage.removeItem("myToken");
                    sessionStorage.removeItem("myToken");
                    localStorage.removeItem("myId");
                    window.location.replace("index.html");
                }

            }).catch((data) => {
                console.error(data.message);
            });

    }
}