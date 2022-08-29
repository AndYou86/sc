class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateonSubmit();
    }

    validateonSubmit() {
        let self = this;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            var error = 0;
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (self.validateFields(input) == false) {
                    error++;
                }
            });
            if (error == 0) {
                let data = {
                        login: document.querySelector('#username').value,
                        password: document.querySelector('#password').value
                    },
                    save = document.querySelector('#save').checked;
                fetch('api/auth', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        header: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((response) => response.json())
                    .then((data) => {
                        if (data.error) {
                            alert(data.text)
                        } else {
                            if (save) {
                                localStorage.setItem('myToken', data.token);
                            } else {
                                sessionStorage.setItem('myToken', data.token);
                            }
                            localStorage.setItem('myId', data.id);
                            this.form.submit();
                        }

                    }).catch((data) => {
                        console.error(data.message);
                    });
            }
        });
    }

    validateFields(field) {
        if (field.value.trim() === "") {
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank`,
                "error"
            );
            return false;
        } else {
            if (field.type == "password") {
                if (field.value.length < 8) {
                    this.setStatus(
                        field,
                        `${field.previousElementSibling.innerText} must be at least 8 characters`,
                        "error"
                    );
                    return false;
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector(".error-message");

        if (status == "success") {
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }

        if (status == "error") {
            if (errorMessage.innerText.length == 0) {
                errorMessage.innerText = message;
            }
            field.classList.add("input-error");
        }
    }
}

const form = document.querySelector(".login-form");
if (form) {
    const fields = ["username", "password"];
    console.log(fields);
    const validator = new Login(form, fields);
}