const firstNameInput = document.getElementById('tutor-firstname');
const lastNameInput = document.getElementById('tutor-lastname');
const tutorPhoneInput = document.getElementById('tutor-phone');
const tutorEmailInput = document.getElementById('tutor-email');
const subjectCheckboxes = document.querySelectorAll('.subject-checkbox');
const paymentMethods = document.querySelectorAll('.payment-method-radio-btn');
const statusMethods = document.querySelectorAll('.status-method-radio-btn');


const firstNameMessage = document.querySelector('.firstname-message');
const lastNameMessage = document.querySelector('.lastname-message');;
const tutorPhoneMessage = document.querySelector('.phone-message');
const tutorEmailMessage = document.querySelector('.email-message');
const subjectMessage = document.querySelector('.subject-message');
const paymentMethodMessage = document.querySelector('.payment-message');

const notes = document.getElementById('notes');
const requiredFields = document.querySelectorAll("[required]")
const saveButton = document.querySelector('.save');

const cancelButton = document.querySelector('.cancel');

const validFirstName = () => {
    firstNameInput.classList.add('valid');
    firstNameInput.classList.remove('invalid');
};

const invalidFirstName = () => {
    firstNameMessage.textContent = "Please enter tutor's first name.";
    firstNameInput.classList.add('invalid');
    firstNameInput.classList.remove('valid');
    firstNameMessage.classList.add('invalid');
    firstNameMessage.classList.remove('valid');
};

const emptyFirstName = () => {
    firstNameMessage.textContent = "";
    firstNameMessage.classList.remove('valid');
    firstNameMessage.classList.remove('invalid');
    firstNameInput.classList.remove('valid');
    firstNameInput.classList.remove('invalid');
};

firstNameInput.addEventListener('input', () => {
    if (firstNameInput.value.trim().length > 0) {
        const state = firstNameInput.validity;

        if (state.valid) {
            validFirstName();
        } else {
            invalidFirstName();
        }
    } else {
        emptyFirstName();
    }
});

const validLastName = () => {
    lastNameInput.classList.add('valid');
    lastNameInput.classList.remove('invalid');
};

const invalidLastName = () => {
    lastNameMessage.textContent = "Please enter tutor's last name.";
    lastNameInput.classList.add('invalid');
    lastNameInput.classList.remove('valid');
    lastNameMessage.classList.add('invalid');
    lastNameMessage.classList.remove('valid');
};

const emptyLastName = () => {
    lastNameMessage.textContent = "";
    lastNameMessage.classList.remove('valid');
    lastNameMessage.classList.remove('invalid');
    lastNameInput.classList.remove('valid');
    lastNameInput.classList.remove('invalid');
};

lastNameInput.addEventListener('input', () => {
    if (lastNameInput.value.trim().length > 0) {
        const state = lastNameInput.validity;

        if (state.valid) {
            validLastName();
        } else {
            invalidLastName();
        }
    } else {
        emptyLastName();
    }
});

tutorPhoneInput.addEventListener('input', () => {
    if (tutorPhoneInput.value.trim().length > 0) {
        tutorPhoneInput.classList.add('valid');
        tutorPhoneInput.classList.remove('invalid');
    } else {
        tutorPhoneMessage.textContent = "Please enter tutor's phone number.";
        tutorPhoneInput.classList.add('invalid');
        tutorPhoneInput.classList.remove('valid');
    }
});


const validEmail = () => {
    tutorEmailMessage.textContent = "Email looks good!";
    tutorEmailInput.classList.add('valid');
    tutorEmailInput.classList.remove('invalid');
    tutorEmailMessage.classList.add('valid');
    tutorEmailMessage.classList.remove('invalid');
};

const invalidEmail = () => {
    tutorEmailMessage.textContent = "Please enter a valid email.";
    tutorEmailInput.classList.add('invalid');
    tutorEmailInput.classList.remove('valid');
    tutorEmailMessage.classList.add('invalid');
    tutorEmailMessage.classList.remove('valid');
};

const emptyEmail = () => {
    tutorEmailMessage.textContent = "";
    tutorEmailMessage.classList.remove('valid');
    tutorEmailMessage.classList.remove('invalid');
    tutorEmailInput.classList.remove('valid');
    tutorEmailInput.classList.remove('invalid');
};

tutorEmailInput.addEventListener('input', () => {
    if (tutorEmailInput.value.trim().length > 0) {
        const state = tutorEmailInput.validity;

        if (state.valid) {
            validEmail();
        } else {
            invalidEmail();
        }
    } else {
        emptyEmail();
    }
});

subjectCheckboxes.forEach(subjectCheckbox => {

    subjectCheckbox.addEventListener("change", () => {

        let checkedBox = 0;

        subjectCheckboxes.forEach(box => {
            if (box.checked) {
                checkedBox++;
            }
        });

        if (checkedBox > 0) {
            subjectCheckboxes.forEach(box => {
                box.classList.add("valid");
                box.classList.remove("invalid");
            });

            subjectMessage.textContent = "";
        } else {
            subjectCheckboxes.forEach(box => {
                box.classList.add("invalid");
                box.classList.remove("valid");
            });

            subjectMessage.textContent = "Please select at least one subject.";
        }

    });

});

paymentMethods.forEach(paymentMethod => {

    paymentMethod.addEventListener("change", () => {

        paymentMethods.forEach(method => {
            method.classList.add("valid");
            method.classList.remove("invalid");
        });

        paymentMethodMessage.textContent = "";

    });

});

statusMethods.forEach(statusMethod => {

    statusMethod.addEventListener("change", () => {

        statusMethods.forEach(method => {
            method.classList.add("valid");
            method.classList.remove("invalid");
        });
    });

});

saveButton.addEventListener('click', () => {
    let checkedSubjects = [];

    subjectCheckboxes.forEach(subject => {
        if (subject.checked) {
            checkedSubjects.push(subject.value);
        }
    });

    let payment = '';

    paymentMethods.forEach(paymentMethod => {
        if (paymentMethod.checked)
            payment = paymentMethod.value;
    });

    let status = '';

    statusMethods.forEach(statusMethod => {
        if (statusMethod.checked)
            status = statusMethod.value;
    })

    const tutor = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        tutorPhone: tutorPhoneInput.value,
        tutorEmail: tutorEmailInput.value,
        subjects: checkedSubjects,
        paymentMethod: payment,
        statusMethod: status
    }

    if (localStorage.getItem('tutors') === null) {
        let tutors = [];
        tutors.push(tutor);
        localStorage.setItem('tutors', JSON.stringify(tutors))
    } else {
        const JSONstring = localStorage.getItem('tutors')
        const tutorArray = JSON.parse(JSONstring);
        tutorArray.push(tutor); 
        localStorage.setItem('tutors', JSON.stringify(tutorArray));
    }

    window.location.href = "tutors.html";
});

cancelButton.addEventListener('click', () => {
    window.location.href = "tutors.html";
});

const calculateProgress = () => {
    const totalRequiredFields = requiredFields.length;
    let completed = 0;

    requiredFields.forEach(field => {
        if (field.value.trim().length > 0 && field.validity.valid) {
            completed++;
        }
    });

    const progress = Math.round((completed / totalRequiredFields) * 100);

    if (progress === 100) {
        saveButton.disabled = false;
    } else {
        saveButton.disabled = true;
    }
};

requiredFields.forEach(field => {
    field.addEventListener('input', calculateProgress);
});

calculateProgress();