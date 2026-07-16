const header = document.querySelector('header');
const description = document.querySelector('.description');

const emailInput = document.getElementById('email');
const sendButton = document.querySelector('.send-button');

const form = document.querySelector('form');
const resetForm = document.querySelector('.reset-form');
const confirmationMessage = document.querySelector('.confirmation-message');
const againButton = document.querySelector('.again-button');

const validEmail = () => {
    emailInput.classList.add('valid');
    emailInput.classList.remove('invalid');
    sendButton.disabled = false;
};

const invalidEmail = () => {
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    sendButton.disabled = true;
};

const emptyEmail = () => {
    emailInput.classList.remove('valid');
    emailInput.classList.remove('invalid');
    sendButton.disabled = true;
};

emailInput.addEventListener('input', () => {
    if (emailInput.value.trim().length > 0) {
        const state = emailInput.validity;

        if (state.valid) {
            validEmail();
        } else {
            invalidEmail();
        }
    } else {
        emptyEmail();
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendButton.textContent = "Sending..."
    sendButton.disabled = true;
    setTimeout(() => {
        sendButton.textContent = "Send Reset Link"
        header.classList.add('hide');
        description.classList.add('hide');
        resetForm.classList.add('hide');
        confirmationMessage.classList.add('show');
    }, 2000)
});

againButton.addEventListener('click', () => {
    window.location.href = "forgot-password.html";
});