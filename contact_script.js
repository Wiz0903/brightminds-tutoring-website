const textArea = document.getElementById('notes');
const characterCount = document.querySelector('.count-words');
const emailInput = document.getElementById('parent-email');
const emailMessage = document.querySelector('.email-message');
const requiredFields = document.querySelectorAll("[required]")
const progressPercent = document.querySelector('.progress-percent');

textArea.addEventListener('input', () => {
    characterCount.textContent = textArea.value.length;
});

const validEmail = () => {
    emailMessage.textContent = "Email looks good!";
    emailInput.classList.add('valid');
    emailInput.classList.remove('invalid');
    emailMessage.classList.add('valid');
    emailMessage.classList.remove('invalid');
};

const invalidEmail = () => {
    emailMessage.textContent = "Please enter a valid email.";
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    emailMessage.classList.add('invalid');
    emailMessage.classList.remove('valid');
};

const emptyEmail = () => {
    emailMessage.textContent = "";
    emailMessage.classList.remove('valid');
    emailMessage.classList.remove('invalid');
    emailInput.classList.remove('valid');
    emailInput.classList.remove('invalid');
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

const calculateProgress = () => {
    const totalRequiredFields = requiredFields.length;
    let completed = 0;

    requiredFields.forEach(field => {
        if (field.value.trim().length > 0 && field.validity.valid) {
            completed++;
        }
    });

    progressPercent.textContent = Math.round((completed / totalRequiredFields) * 100);
};

requiredFields.forEach(field => {
    field.addEventListener('input', calculateProgress);
});

calculateProgress();