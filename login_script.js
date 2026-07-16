const password = document.getElementById('password');
const passwordButton = document.querySelector('.show-password');

const requiredFields = document.querySelectorAll("[required]")
const loginButton = document.querySelector('.login');

const form = document.querySelector('.login-form form');
const usernameInput = document.getElementById('username');
const errorMessage = document.querySelector('.error-message');

const rememberCheckbox = document.getElementById('remember');

passwordButton.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = "text";
        passwordButton.textContent = "Hide"
    } else {
        password.type = "password";
        passwordButton.textContent = "Show"
    }
});

const updateLoginButton = () => {
    const totalRequiredFields = requiredFields.length;
    let completed = 0;

    requiredFields.forEach(field => {
        if (field.value.trim().length > 0 && field.validity.valid) {
            completed++;
        }
    });

    const progress = Math.round((completed / totalRequiredFields) * 100);

    if (progress === 100) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
};

requiredFields.forEach(field => {
    field.addEventListener('input', updateLoginButton);
});

updateLoginButton();

const loginUsername = "tshoks03";
const loginPassword = "wizzy";

form.addEventListener('submit', (event) => {
    event.preventDefault();
    loginButton.textContent = 'Logging In...';
    loginButton.disabled = true;

    setTimeout(() => {
        if ((usernameInput.value === loginUsername) && (password.value === loginPassword)) {
            errorMessage.classList.remove('show');

            if (rememberCheckbox.checked === true) {
                localStorage.setItem("loggedIn", "true")
            }
            window.location.href = "dashboard.html";
        } else {
            loginButton.textContent = 'Log In';
            loginButton.disabled = false;
            errorMessage.classList.add('show');
        }
    }, 2000);
});

if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "dashboard.html";
}
