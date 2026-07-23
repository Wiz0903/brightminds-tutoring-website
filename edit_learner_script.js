const learnerIndex = localStorage.getItem('selectedLearnerIndex');
const learners = localStorage.getItem('learners');
const learnersArray = JSON.parse(learners);
const selectedLearner = learnersArray[learnerIndex];

const learnerFirstNameElement = document.getElementById('learner-firstname');
const learnerLastNameElement = document.getElementById('learner-lastname');
const gradeElement = document.getElementById('grade');
const schoolElement = document.getElementById('school');
const parentNameElement = document.getElementById('parent-name');
const parentPhoneElement = document.getElementById('parent-phone');
const parentEmailElement = document.getElementById('parent-email');
const subjectCheckboxes = document.querySelectorAll('.subject-checkbox');
const currentChallengesElement = document.getElementById('notes');
const paymentMethods = document.querySelectorAll('.payment-method-radio-btn');
const statusMethods = document.querySelectorAll('.status-method-radio-btn');
const saveButton = document.querySelector('.save');

learnerFirstNameElement.value = selectedLearner.firstName;
learnerLastNameElement.value = selectedLearner.lastName;
gradeElement.value = selectedLearner.grade;
schoolElement.value = selectedLearner.school;
parentNameElement.value = selectedLearner.parentName;
parentPhoneElement.value = selectedLearner.parentPhone;
parentEmailElement.value = selectedLearner.parentEmail;
currentChallengesElement.value = selectedLearner.currentChallenges;

subjectCheckboxes.forEach(checkbox => {
    checkbox.checked = selectedLearner.subjects.includes(checkbox.value);
});

paymentMethods.forEach(method => {
    method.checked = method.value === selectedLearner.paymentMethod;
});

statusMethods.forEach(method => {
    method.checked = method.value === selectedLearner.statusMethod;
});

saveButton.addEventListener('click', () => {
    selectedLearner.firstName = learnerFirstNameElement.value;
    selectedLearner.lastName = learnerLastNameElement.value;
    selectedLearner.grade = gradeElement.value;
    selectedLearner.school = schoolElement.value;
    selectedLearner.parentName = parentNameElement.value;
    selectedLearner.parentPhone = parentPhoneElement.value;
    selectedLearner.parentEmail = parentEmailElement.value;
    selectedLearner.currentChallenges = currentChallengesElement.value;

    selectedLearner.subjects = Array.from(subjectCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    selectedLearner.paymentMethod = Array.from(paymentMethods)
        .find(method => method.checked)?.value;

    selectedLearner.statusMethod = Array.from(statusMethods)
        .find(method => method.checked)?.value;

    learnersArray[learnerIndex] = selectedLearner;
    localStorage.setItem('learners', JSON.stringify(learnersArray));
    window.location.href = "learners.html";
});