const firstNameInput = document.getElementById('learner-firstname');
const lastNameInput = document.getElementById('learner-lastname');
const gradeInput = document.getElementById('grade');
const schoolInput = document.getElementById('school');
const parentNameInput = document.getElementById('parent-name');
const parentPhoneInput = document.getElementById('parent-phone');
const parentEmailInput = document.getElementById('parent-email');
const subjectCheckboxes = document.querySelectorAll('.subject-checkbox');
const paymentMethods = document.querySelectorAll('.payment-method-radio-btn');
const statusMethods = document.querySelectorAll('.status-method-radio-btn');


const firstNameMessage = document.querySelector('.firstname-message');
const lastNameMessage = document.querySelector('.lastname-message');
const gradeMessage = document.querySelector('.grade-message');
const schoolMessage = document.querySelector('.school-message');
const parentNameMessage = document.querySelector('.parent-name-message');
const parentPhoneMessage = document.querySelector('.parent-phone-message');
const parentEmailMessage = document.querySelector('.email-message');
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
    firstNameMessage.textContent = "Please enter learner's first name.";
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
    lastNameMessage.textContent = "Please enter learner's last name.";
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

gradeInput.addEventListener('input', () => {
    if (gradeInput.value > 3 && gradeInput.value <= 12) {
        gradeInput.classList.add('valid');
        gradeInput.classList.remove('invalid');
    } else {
        gradeMessage.textContent = "Please enter a grade between 4 and 12.";
        gradeInput.classList.add('invalid');
        gradeInput.classList.remove('valid');
    }
});

schoolInput.addEventListener('input', () => {
    if (schoolInput.value.trim().length > 0) {
        schoolInput.classList.add('valid');
        schoolInput.classList.remove('invalid');
    } else {
        schoolMessage.textContent = "Please enter learner's school.";
        schoolInput.classList.add('invalid');
        schoolInput.classList.remove('valid');
    }
});

parentNameInput.addEventListener('input', () => {
    if (parentNameInput.value.trim().length > 0) {
        parentNameInput.classList.add('valid'); 
        parentNameInput.classList.remove('invalid');
    } else {
        parentNameMessage.textContent = "Please enter parent/guardian's name.";
        parentNameInput.classList.add('invalid');
        parentNameInput.classList.remove('valid');
    }
});

parentPhoneInput.addEventListener('input', () => {
    if (parentPhoneInput.value.trim().length > 0) {
        parentPhoneInput.classList.add('valid');
        parentPhoneInput.classList.remove('invalid');
    } else {
        parentPhoneMessage.textContent = "Please enter parent/guardian's phone number.";
        parentPhoneInput.classList.add('invalid');
        parentPhoneInput.classList.remove('valid');
    }
});


const validEmail = () => {
    parentEmailMessage.textContent = "Email looks good!";
    parentEmailInput.classList.add('valid');
    parentEmailInput.classList.remove('invalid');
    parentEmailMessage.classList.add('valid');
    parentEmailMessage.classList.remove('invalid');
};

const invalidEmail = () => {
    parentEmailMessage.textContent = "Please enter a valid email.";
    parentEmailInput.classList.add('invalid');
    parentEmailInput.classList.remove('valid');
    parentEmailMessage.classList.add('invalid');
    parentEmailMessage.classList.remove('valid');
};

const emptyEmail = () => {
    parentEmailMessage.textContent = "";
    parentEmailMessage.classList.remove('valid');
    parentEmailMessage.classList.remove('invalid');
    parentEmailInput.classList.remove('valid');
    parentEmailInput.classList.remove('invalid');
};

parentEmailInput.addEventListener('input', () => {
    if (parentEmailInput.value.trim().length > 0) {
        const state = parentEmailInput.validity;

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

    const learner = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        grade: gradeInput.value,
        school: schoolInput.value,
        parentName: parentNameInput.value,
        parentPhone: parentPhoneInput.value,
        parentEmail: parentEmailInput.value,
        subjects: checkedSubjects,
        currentChallenges: notes.value,
        paymentMethod: payment,
        statusMethod: status
    }

    if (localStorage.getItem('learners') === null) {
        let learners = [];
        learners.push(learner);
        localStorage.setItem('learners', JSON.stringify(learners))
    } else {
        const JSONstring = localStorage.getItem('learners')
        const learnerArray = JSON.parse(JSONstring);
        learnerArray.push(learner); 
        localStorage.setItem('learners', JSON.stringify(learnerArray));
    }

    window.location.href = "learners.html";
});

cancelButton.addEventListener('click', () => {
    window.location.href = "learners.html";
});